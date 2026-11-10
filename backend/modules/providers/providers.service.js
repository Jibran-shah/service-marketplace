import mongoose from "mongoose";
import { Provider } from "../../models/Provider.model.js";
import {
  NotFoundError,
  UnauthorizedError
} from "../../errors/Http.error.js";
import { User } from "../../models/User.model.js";
import { syncRole } from "../../utils/roleSync.utils.js";
import {
  PROFILE_ROLE
} from "../../constants/profile.constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.utils.js";
import {
  refreshSessionSystem
} from "../../utils/session.utils.js";
import {
  parseMongoDuplicateError
} from "../../utils/errorHandling.utils.js";
import {
  buildLocation,
  buildGeoNearQuery
} from "../../utils/location.utils.js";
import { syncProviderLocationToServices } from "../services/services.service.js";

export const createProvider = async ({
  user,
  title,
  description,
  skills,
  experienceYears,
  locationLat,
  locationLn,
  fullAddress
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userDoc = await User.findById(user.id).session(session);

    if (!userDoc) {
      throw new Error("User not found");
    }

    const location = buildLocation(
      locationLn,
      locationLat,
      fullAddress
    );

    const provider = await Provider.findOneAndUpdate(
      { user: user.id },
      {
        $setOnInsert: {
          user: user.id,
          title,
          description,
          skills,
          experienceYears,
          ...(location && { location })
        }
      },
      {
        session,
        upsert: true,
        runValidators: true,
        returnDocument: "after"
      }
    ).populate({path:"user"})


    if (!provider) {
      throw new Error("Provider creation failed");
    }

    console.log(user);
    await syncRole({
      userId: user.id,
      role: PROFILE_ROLE.PROVIDER,
      Model: Provider,
      session
    });

    userDoc.provider = provider._id;

    await userDoc.save({ session });

    const sessionId = refreshSessionSystem.generateId();

    const accessToken = generateAccessToken({
      user: {
        ...(userDoc.toObject() || userDoc),
        provider: provider._id
      }
    });

    const refreshToken = generateRefreshToken({
      user: {
        ...(userDoc.toObject() || userDoc),
        provider:provider._id
      },
      sessionId
    });

    await refreshSessionSystem.save(
      userDoc._id,
      sessionId,
      refreshToken
    );

    await session.commitTransaction();

    return {
      user: userDoc,
      provider: provider,
      refreshToken,
      accessToken
    };

  } catch (err) {

    await session.abortTransaction();

    const error = parseMongoDuplicateError(err);
    if (error) {
      throw new ConflictError(
        `${error.field} already exists`,
        [{ field: error.field, message: error.message }]
      );
    }

    throw err;

  } finally {
    await session.endSession();
  }
};


export const getAllProviders = async (filters = {}) => {
  const query = {};

  if (filters.isApproved !== undefined) {
    query.isApproved =
      filters.isApproved === true ||
      filters.isApproved === "true";
  }

  if (filters.user) {
    if (!mongoose.Types.ObjectId.isValid(filters.user)) {
      throw new Error("Invalid user ID");
    }
    query.user = filters.user;
  }

  if (filters.skills) {
    const skillsArray = Array.isArray(filters.skills)
      ? filters.skills
      : filters.skills
          .split(",")
          .map(s => s.trim().toLowerCase());

    query.skills = { $in: skillsArray };
  }

  if (filters.minExperience) {
    query.experienceYears = {
      $gte: Number(filters.minExperience)
    };
  }

  /* =========================
     GEO QUERY (CLEAN)
  ========================= */

  const geoQuery =
    filters.lng &&
    filters.lat &&
    filters.radius
      ? buildGeoNearQuery(
          filters.lng,
          filters.lat,
          filters.radius
        )
      : null;

  const finalQuery = geoQuery
    ? { ...query, ...geoQuery }
    : query;

  const page = parseInt(filters.page || "1");
  const limit = parseInt(filters.limit || "20");
  const skip = (page - 1) * limit;

  return await Provider.find(finalQuery)
    .populate("user", "name email avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

/* =========================
   GET BY ID
========================= */

export const getProviderById = async (id) => {
  return Provider.findById(id).populate({
    path:"user",
    select:"profile",
    populate:{
        path:"profile",
        select:"name avatar cover",
        populate:[
          {
            path:"avatar",
            select:"file",
            populate:{
              path:"file",
              select:"url"
            }
          },
          {
            path:"cover",
            select:"file",
            populate:{
              path:"file",
              select:"url"
            }
          }
        ]
      }
    }
  );
};
export const updateProvider = async (
  id,
  updates,
  userId
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const provider = await Provider.findById(id).session(session);

    if (!provider) {
      throw new NotFoundError("provider not found");
    }

    if (provider.user.toString() !== userId.toString()) {
      throw new UnauthorizedError(
        "Not allowed to update this provider"
      );
    }

    const {
      title,
      description,
      skills,
      experienceYears,
      isApproved,
      locationLat,
      locationLn,
      fullAddress
    } = updates;

    if (title !== undefined) provider.title = title;
    if (description !== undefined) provider.description = description;
    if (skills !== undefined) provider.skills = skills;
    if (experienceYears !== undefined) provider.experienceYears = experienceYears;
    if (isApproved !== undefined) provider.isApproved = isApproved;

    /* =========================
       LOCATION UPDATE
    ========================= */
    let locationChanged = false;

    const location = buildLocation(
      locationLn,
      locationLat,
      fullAddress
    );

    if (location) {
      provider.location = location;
      locationChanged = true;
    }

    await provider.save({ session });

    /* =========================
       SYNC SERVICES (ONLY IF LOCATION CHANGED)
    ========================= */
    if (locationChanged) {
      await syncProviderLocationToServices({
        providerId: provider._id,
        location: provider.location,
        session
      });
    }

    await session.commitTransaction();
    session.endSession();

    return provider;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


/* =========================
   UPDATE BY USER
========================= */

export const updateProviderByUser = async (
  updates,
  userId
) => {
  
const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const provider =
    await Provider.findOne({ user: userId }).session(session);

    if (!provider) {
      throw new NotFoundError("provider not found");
    }

    if (provider.user.toString() !== userId.toString()) {
      throw new UnauthorizedError(
        "Not allowed to update this provider"
      );
    }

    const {
      title,
      description,
      skills,
      experienceYears,
      isApproved,
      locationLat,
      locationLn,
      fullAddress
    } = updates;

    if (title !== undefined) provider.title = title;
    if (description !== undefined) provider.description = description;
    if (skills !== undefined) provider.skills = skills;
    if (experienceYears !== undefined) provider.experienceYears = experienceYears;
    if (isApproved !== undefined) provider.isApproved = isApproved;

    /* =========================
       LOCATION UPDATE
    ========================= */
    let locationChanged = false;

    const location = buildLocation(
      locationLn,
      locationLat,
      fullAddress
    );

    if (location) {
      provider.location = location;
      locationChanged = true;
    }

    await provider.save({ session });

    /* =========================
       SYNC SERVICES (ONLY IF LOCATION CHANGED)
    ========================= */
    if (locationChanged) {
      await syncProviderLocationToServices({
        providerId: provider._id,
        location: provider.location,
        session
      });
    }

    await session.commitTransaction();
    session.endSession();

    return provider;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

/* =========================
   DELETE PROVIDER
========================= */

export const deleteProvider = async (user) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const provider =
      await Provider.findById(user.Provider).session(session);

    if (!provider) {
      throw new NotFoundError(
        "provider not found"
      );
    }
    await provider.deleteOne({ session });

    await syncRole({
      userId: user.id,
      role: PROFILE_ROLE.PROVIDER,
      Model: Provider,
      session
    });

    const _user = await User.findOneAndUpdate(
      { _id: user.id },
      { provider: null },
      { session, returnDocument:"after" }
    );

    const sessionId =
      refreshSessionSystem.generateId();

    const accessToken = generateAccessToken({
      user: _user
    });

    const refreshToken =
      generateRefreshToken({
        user: _user,
        sessionId
      });

    await refreshSessionSystem.deleteAll(user.id);

    await session.commitTransaction();
    session.endSession();

    return { refreshToken, accessToken, user:_user };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

/* =========================
   BULK DELETE
========================= */

export const bulkDeleteProviders = async (
  ids
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const providers = await Provider.find({
      _id: { $in: ids }
    }).session(session);

    const userIds = [
      ...new Set(
        providers.map(p => p.user.toString())
      )
    ];

    const deleted =
      await Provider.deleteMany({
        _id: { $in: ids }
      }).session(session);

    for (const userId of userIds) {
      await syncRole({
        userId,
        role: PROFILE_ROLE.PROVIDER,
        Model: Provider,
        session
      });

      await User.findByIdAndUpdate(
        userId,
        { provider: null },
        { session }
      );

      await refreshSessionSystem.deleteAll(
        userId
      );
    }

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      deletedCount: deleted.deletedCount
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


export const deleteProviderAdminService = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const provider =
      await Provider.findById(id).session(session);

    if (!provider) {
      throw new NotFoundError(
        "provider not found"
      );
    }
    await provider.deleteOne({ session });

    await syncRole({
      userId: provider.user,
      role: PROFILE_ROLE.PROVIDER,
      Model: Provider,
      session
    });

    const _user = await User.findOneAndUpdate(
      { _id: provider.user },
      { provider: null },
      { session, returnDocument:"after" }
    );

    refreshSessionSystem.deleteAll(_user._id);

    await session.commitTransaction();
    session.endSession();

    return { user:_user };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};