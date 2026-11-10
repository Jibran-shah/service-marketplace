import Joi from "joi";
import { mongoIdSchema } from "../../validationSchemas/mongodb.schemas.js";

export const createProviderSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(120)
    .required(),

  description: Joi.string()
    .max(1000)
    .allow("", null)
    .optional(),

  skills: Joi.array()
    .items(Joi.string().trim().min(1))
    .unique()
    .optional(),

  locationLat: Joi.number()
    .min(-90)
    .max(90)
    .optional(),

  locationLn: Joi.number()
    .min(-180)
    .max(180)
    .optional(),

  fullAddress: Joi.string()
    .max(300)
    .allow("", null)
    .optional(),

  experienceYears: Joi.number()
    .min(0)
    .optional()
});


export const updateProviderSchema = Joi.object({
  title: Joi.string().trim().min(1).max(120),

  description: Joi.string().max(1000).allow("", null),

  skills: Joi.array()
    .items(Joi.string().trim().min(1))
    .unique(),

  experienceYears: Joi.number().min(0),

  locationLat: Joi.number().min(-90).max(90),
  locationLn: Joi.number().min(-180).max(180),

  fullAddress: Joi.string().max(300).allow("", null),

  isApproved: Joi.boolean().forbidden(),

  ratingSum: Joi.forbidden(),
  ratingCount: Joi.forbidden(),
  ratingAverage: Joi.forbidden()
}).min(1);

export const getAllProviderQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),

  isApproved: Joi.boolean().optional(),

  user: mongoIdSchema.optional(),

  locationLat: Joi.number().min(-90).max(90).optional(),
  locationLn: Joi.number().min(-180).max(180).optional(),
  
  /**  meters */
  radius: Joi.number().min(1).max(500000).optional(), 

  skills: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim().min(1)).unique(),
    Joi.string().pattern(/^[a-zA-Z0-9, ]+$/)
  ),

  minExperience: Joi.number().min(0).optional()
});


export const providerIdParamSchema = Joi.object({
  id: mongoIdSchema.required().label("id")
});


export const bulkDeleteProviderSchema = Joi.object({
  ids: Joi.array()
    .items(mongoIdSchema.required())
    .min(1)
    .required()
});