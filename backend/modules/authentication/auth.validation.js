import Joi from "joi";
import { emailSchema, otpSchema, passwordSchema, requiredMsg, usernameSchema } from "../../validationSchemas/general.schemas.js";
import { mongoIdSchema } from "../../validationSchemas/mongodb.schemas.js";

export const registerSchema = Joi.object({
  username: usernameSchema.required().messages(requiredMsg("username")),

  email: emailSchema.required().messages(requiredMsg("email")),

  password: passwordSchema.required().messages(requiredMsg("password")),
})
.required()
.messages({
  "object.base": "Request body must be an object",
});

export const loginSchema = Joi.object({
  username: usernameSchema.optional(),

  email:emailSchema.optional(),

  password: passwordSchema.required().messages(requiredMsg("password")),
})
.or("email", "username")
.messages({
  "object.missing": "Either email or username is required for login",
});


export const forgotPasswordSchema = Joi.object({
  email: emailSchema.required().messages(requiredMsg("email"))
});


export const verifyResetOtpSchema = Joi.object({
  email: emailSchema.required().messages(requiredMsg("email")),

  otp:otpSchema.required().messages(requiredMsg("otp")),
});

export const resetPasswordSchema = Joi.object({
  newPassword: passwordSchema
    .required()
    .messages(requiredMsg("password")),
});


export const resendResetOtpSchema = Joi.object({
  email: emailSchema
    .required()
    .messages(requiredMsg("email")),
});


export const verifyEmailSchema = Joi.object({
  userId: mongoIdSchema
    .required()
    .messages(requiredMsg("userId")),

  token: Joi.string()
    .required()
    .messages({
      "any.required": "Verification token is required",
    }),
});


export const paramIdSchema = Joi.object({
  id: mongoIdSchema
    .required()
    .messages(requiredMsg("id"))
})


export const resendVerifyEmailSchema = Joi.object({
  userId: mongoIdSchema
    .required()
    .messages(requiredMsg("userId"))
});