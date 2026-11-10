import Joi from "joi";
import { mongoIdSchema } from "../../validationSchemas/mongodb.schemas.js";
import { phoneSchema } from "../../validationSchemas/general.schemas.js";
import { PROFILE_ROLES_ARRAY } from "../../constants/profile.constants.js";

export const createProfileSchema = Joi.object({
  name: Joi.string().trim().min(1).max(80).required(),

  phone: phoneSchema.optional(),

  bio: Joi.string().max(500).optional(),
  country: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),

  role: Joi.forbidden(),
  user: Joi.forbidden()
});


export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(1).max(80).optional(),

  fileId: mongoIdSchema.optional(),

  phone: phoneSchema.optional(),

  bio: Joi.string().max(500).optional(),
  country: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),

  role: Joi.forbidden(),
  user: Joi.forbidden()
})
  .or("fileId", "name", "phone", "bio", "country", "city", "address")
  .messages({
    "object.missing": "At least one field must be provided"
  });


export const fullProfileSchema  = Joi.object({
  id: mongoIdSchema.required().label("id")
});

export const getProfilesQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).max(80).optional(),
  country: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
  roles: Joi.alternatives().try(
    Joi.array().items(
      Joi.string().valid(...PROFILE_ROLES_ARRAY)
    ),
    Joi.string() // allow ?roles=provider
  ).optional(),

  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional()
});



export const profileIdSchema = Joi.object({
  id: mongoIdSchema.required().label("id")
});