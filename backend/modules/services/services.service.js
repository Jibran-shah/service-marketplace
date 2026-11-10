import mongoose from "mongoose";
import { Service } from "../../models/Service.model.js";
import { Category } from "../../models/Category.model.js";
import { isValidId } from "../../validationSchemas/mongodb.schemas.js";
import { escapeRegex } from "../../utils/escapeRegex.utils.js";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from "../../errors/index.js";

import {
  buildLocation,
  buildGeoNearQuery
} from "../../utils/location.utils.js";
import {
  Provider
} from "../../models/Provider.model.js";

import {mediaService} from "../media/media.service.js"

export const serviceDeepPopulate = {
  path: "provider",
  populate: {
    path: "user",
    populate: {
      path: "profile",
      populate:{
        path:"avatar",
        populate:{
          path:"file"
        }
      }
    }
  }
};


export const createService = async (data) => {
  const files = data.files;
  const fileIds = data.fileIds;
  const category = await Category.findById(data.category);
  if (!category) {
    throw new NotFoundError("Category not found");
  }

  if(!data.user.provider){
    return new UnauthorizedError("Not a provider");
  }

  const provider = await Provider.findOne({user:data.user.id});

  if(!provider){
    return new UnauthorizedError("Not a provider");
  }

  const location = buildLocation(
    provider.location?.coordinates[0],
    provider.location?.coordinates[1],
    provider.fullAddress
  );

  console.log(data.mediaContext)

  const images = await mediaService.resolve({
      files,
      fileIds,
      context: data.mediaContext?.imageFiles,
      userId: data.user.id
  });
  
  const service = await Service.create({
    ...data,
    images,
    provider:provider._id,
    category: category._id,
    categoryPath: category.path,
    location
  });

  return service;
};

export const getServices = async (query) => {
  let {
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    category,
    status,
    provider,
    sort = "-createdAt",
    locationLn,
    locationLat,
    radius,
    search,
  } = query;

  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const filter = {};

  if (search?.trim()) {
    const regex = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [
      { name: regex },
      { description: regex },
    ];
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (category) {
    if (!isValidId(category))
      throw new BadRequestError("Invalid category id");
    const cat = await Category.findById(category);
    if (!cat)
      throw new NotFoundError("Category not found");
    filter.categoryPath = {
      $regex: `^${escapeRegex(cat.path)}`,
    };
  }


  if (status)
    filter.status = status;

  if (provider) {
    if (!isValidId(provider))
      throw new BadRequestError("Invalid provider id");
    filter.provider = provider;
  }

  const hasLocation = [locationLn, locationLat, radius].every(
    (value) => value !== undefined && value !== null && value !== ""
  );

  let countFilter = { ...filter };

  if (hasLocation) {
    const longitude = Number(locationLn);
    const latitude = Number(locationLat);
    const distance = Number(radius);
    
    if (
      !Number.isFinite(longitude) ||
      !Number.isFinite(latitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90 ||
      !Number.isFinite(distance) ||
      distance <= 0
    ) {
      throw new BadRequestError("Invalid location or radius");
    }

    filter.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: distance,
      },
    };

    countFilter.location = {
      $geoWithin: {
        $centerSphere: [
          [longitude, latitude],
          distance / 6378100,
        ],
      },
    };
  }

  const servicesQuery = Service.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("provider", "name")
    .populate("category", "name")
    .populate({
      path: "images",
      select: "file",
      populate: {
        path: "file",
        select: "url",
      },
    })
    .populate(serviceDeepPopulate);

  if (!hasLocation)
    servicesQuery.sort(sort);
  
  const [services, total] = await Promise.all([
    servicesQuery,
    Service.countDocuments(countFilter),
  ]);

  return {
    services,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };
};

export const getServicesByProvider = async (provider) => {
  if (!isValidId(provider)) {
    throw new BadRequestError("Invalid provider id");
  }

  return await Service.find({ provider })
    .sort("-createdAt")
    .populate("category", "name")
    .populate({
      path:"images",
      select:"file",
      populate:{
        path:"file",
        select:"url"
      }
    })
    .populate(serviceDeepPopulate);
};

/* =========================================================
   GET SERVICES BY CATEGORY (SUBTREE)
========================================================= */
export const getByCategory = async (categoryId) => {
  if (!isValidId(categoryId)) {
    throw new BadRequestError("Invalid category id");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  const safePath = escapeRegex(category.path);

  return await Service.find({
    categoryPath: { $regex: `^${safePath}` }
  })
    .sort("-createdAt")
    .populate("provider", "name")
    .populate(serviceDeepPopulate);
};

export const getServiceById = async (serviceId) => {
  if (!isValidId(serviceId)) {
    throw new BadRequestError("Invalid service id");
  }

  const service = await Service.findById(serviceId)
    .populate("provider", "name email")
    .populate("category", "name")
    .populate({
      path:"images",
      select:"file",
      populate:{
        path:"file",
        select:"url"
      }
    })
    .populate(serviceDeepPopulate);

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  return service;
};

export const updateService = async ({
  serviceId,
  user,
  data
}) => {

  data.images = data.images || [];

  if (!isValidId(serviceId)) {
    throw new BadRequestError("Invalid service id");
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  if (service.provider.toString() !== user.provider) {
    throw new UnauthorizedError(
      "Not allowed to update this service"
    );
  }

  const forbiddenFields = [
    "provider",
    "category",
    "categoryPath",
    "bookedCount",
    "ratingSum",
    "ratingCount",
    "ratingAverage"
  ];

  for (const field of forbiddenFields) {
    if (field in data) {
      throw new BadRequestError(
        `Cannot update field: ${field}`
      );
    }
  }

  if (data.files) {
    const images = await mediaService.resolve({
      files: data.files || [],
      context,
      userId:user.id
    });

    service.images = [...images];
  }

  service.images = [...service.images,...data.images]

  Object.assign(service, data);

  await service.save();
  const _service = Service.findById(service._id)
  .populate(serviceDeepPopulate);
  return _service;
};


export const deleteService = async ({
  serviceId,
  user
}) => {
  if (!isValidId(serviceId)) {
    throw new BadRequestError("Invalid service id");
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  if (service.provider.toString() !== user.provider) {
    throw new UnauthorizedError("Not allowed to delete this service");
  }

  await service.deleteOne();

  return true;
};


/**
 * Sync Provider location to all Services
 *
 * @param {Object} params
 * @param {ObjectId} params.providerId
 * @param {Object} params.location - GeoJSON { type, coordinates, fullAddress }
 * @param {ClientSession} [params.session]
 */
export const syncProviderLocationToServices = async ({
  providerId,
  location,
  session
}) => {
  if (!providerId || !location) return;

  // ensure we never write invalid geo data
  const hasCoords =
    Array.isArray(location.coordinates) &&
    location.coordinates.length === 2 &&
    Number.isFinite(location.coordinates[0]) &&
    Number.isFinite(location.coordinates[1]);

  const update = {
    location: {
      type: "Point",
      ...(hasCoords ? { coordinates: location.coordinates } : {}),
      fullAddress: location.fullAddress || ""
    }
  };

  await Service.updateMany(
    { provider: providerId },
    { $set: update },
    { session }
  );
};