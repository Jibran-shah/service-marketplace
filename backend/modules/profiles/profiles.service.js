import mongoose from "mongoose";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import { NotFoundError } from "../../errors/index.js";
import { mediaService } from "../media/media.service.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.utils.js";
import { refreshSessionSystem } from "../../utils/session.utils.js";
import { Provider } from "../../models/Provider.model.js";

export const createProfile = async (
  user,
  profileData,
  media,
  contextMap
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userDoc = await User.findById(user.id).session(session);

    if (!userDoc) {
      throw new Error("User not found");
    }

    const avatarFile = media?.avatar || [];
    const coverFile = media?.cover || [];

    const avatarAssetIds = await mediaService.resolve({
      files: avatarFile,
      fileIds: [],
      context: contextMap.avatar,
      userId: user.id,
      session,
    });

    const coverAssetIds = await mediaService.resolve({
      files: coverFile,
      fileIds: [],
      context: contextMap.cover,
      userId: user.id,
      session,
    });

    const profile = await Profile.findOneAndUpdate(
      { user: user.id },
      {
        $setOnInsert: {
          user: user.id,
          ...profileData,
          avatar: avatarAssetIds[0] || null,
          cover: coverAssetIds[0] || null,
        },
      },
      {
        session,
        upsert: true,
        returnDocument: "after",
      }
    ).populate([
      {
        path:"cover",
        populate:{
          path:"file"
        }
      },
      {
        path:"avatar",
        populate:{
          path:"file"
        }
      },
    ]
    )

    if (!profile) {
      throw new Error("Profile creation failed");
    }

    userDoc.profile = profile._id;

    await userDoc.save({ session });

    const sessionId = refreshSessionSystem.generateId();

    const accessToken = generateAccessToken({
      user: {
        ...(userDoc.toObject() || userDoc),
        profile: profile._id,
      },
    });

    const refreshToken = generateRefreshToken({
      user: {
        ...(userDoc.toObject() || userDoc),
        profile: profile._id,
      },
      sessionId,
    });

    await refreshSessionSystem.save(
      userDoc._id,
      sessionId,
      refreshToken
    );

    await session.commitTransaction();
    return {
      accessToken,
      refreshToken,
      profile: profile,
      user: userDoc,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

export const getProfileByUser = async (id) => {
  const profile = await Profile.findOne({user:id})
  .populate([
      {
        path: "avatar",select:"file namespace slug",
          populate:{
            path:"file",
            select:"url formate size mimeType"
      }},
      {
        path: "cover",select:"file namespace slug",
          populate:{
            path:"file",
            select:"url formate size mimeType"
      }}
    ])
  .lean()

  
  return profile
};

export const getProfileById = async (id)=>{
  const profile = await  Profile.findById(id)
  .populate([
      {
        path: "avatar",select:"file namespace slug",
          populate:{
            path:"file",
            select:"url formate size mimeType"
      }},
      {
        path: "cover",select:"file namespace slug",
          populate:{
            path:"file",
            select:"url formate size mimeType"
      }}
    ])
  .lean()
  return profile;
}

export const getProfilesByQuery = async (filters)=>{
  const query = {};

  if (filters.user) {
    query.user = filters.user;
  }

  if(filters.roles){
    query.roles = Array.isArray(filters.roles)
    ? filters.roles
    : filters.roles?.split(",");
  }

  if(filters.country){
    query.country = filters.country
  }

  if(filters.city){
    query.city = filters.city
  }

  if(filters.address){
    query.address = filters.address
  }

  const page = parseInt(filters.page || "1");
  const limit = parseInt(filters.limit || "20");
  const skip = (page - 1) * limit;


  const [docs, total] = await Promise.all([
    Profile.find(query)
      .populate([
        {
          path: "avatar",select:"file namespace slug",
            populate:{
              path:"file",
              select:"url formate size mimeType"
        }},
        {
          path: "cover",select:"file namespace slug",
            populate:{
              path:"file",
              select:"url formate size mimeType"
        }}
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Profile.countDocuments(query)
  ]);


  const data = docs;

  const pages = Math.ceil(total / limit);
  

  const pagination = {
    total,
    page,
    limit,
    pages,
    hasNextPage: page < pages,
    hasPrevPage: page > 1
  };

  
  return {
    data,
    pagination
  };
}

export const updateProfile = async (
  userId,
  profileData,
  media,
  contextMap
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const profile = await Profile.findOne({ user: userId }).session(session);
    if (!profile) throw new NotFoundError("Profile not found");

    const avatarFile = media?.avatar || [];
    const coverFile = media?.cover || [];


    const avatarAssetIds = await mediaService.resolve({
      files: avatarFile,
      fileIds: [],
      context: contextMap.avatar,
      userId,
      session
    });

    const coverAssetIds = await mediaService.resolve({
      files: coverFile,
      fileIds: [],
      context: contextMap.cover,
      userId,
      session
    });

    // IMPORTANT: replace old asset safely
    if (avatarAssetIds.length && profile.avatar) {
      await mediaService.remove(profile.avatar, userId, session);  
    }

    if (coverAssetIds.length && profile.cover) {
      await mediaService.remove(profile.cover, userId, session);  
    }

    const updated = await Profile.findOneAndUpdate(
      { user: userId },
      {
        ...profileData,
        ...(avatarAssetIds.length && { avatar: avatarAssetIds[0] }),
        ...(coverAssetIds.length && { cover: coverAssetIds[0] }),
      },
      { returnDocument:"after" , session }
    ).lean()

    await session.commitTransaction();
    return updated;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};


export const deleteProfile = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const profile = await Profile.findOne({ user: userId }).session(session);
    if (!profile) throw new NotFoundError("profile doesn't exists");
    await mediaService.remove(profile.avatar, userId, session);
    await mediaService.remove(profile.cover, userId, session);

    await Profile.deleteOne({ _id: profile._id }).session(session);

    await Provider.deleteOne({ user: userId }).session(session);
    await Shop.deleteOne({ user: userId }).session(session);

    await User.findByIdAndDelete(userId);

    refreshSessionSystem.deleteAll(userId);

    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};


export const getFullProfileService = async (id) => {

  const user = await User.findById(id)
  .populate({
    path:"profile",
    populate:[{
        path:"cover",
        select:"file",
        populate:{
          path:"file",
          select:"url"
        }
      },
      {
        path:"avatar",
        select:"file",
        populate:{
          path:"file",
          select:"url"
        }
      }
    ]
  })
  .populate("provider")
  .populate({
    path:"shop",
    populate:{
      path:"logo",
      select:"file",
      populate:{
        path:"file",
        select:"url"
      }
    }
  })
  .select("-password -__v")
  .lean()


  const profile = user.profile;
  const provider = user.provider
  const shop = user.shop

  // 3. Compose final object
  return {
    user:user,
    profile: profile || null,
    provider: provider || null,
    shop: shop || null,
  };
};