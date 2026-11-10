import Joi from "joi";
import { mongoIdSchema } from "../../validationSchemas/mongodb.schemas.js";
import { BOOKING_STATUS_ARRAY } from "../../constants/booking.constants.js";

export const paramsBookingIdSchema = Joi.object({
  bookingId: mongoIdSchema.required().label("bookingId")
});

export const createBookingSchema = Joi.object({
  
  service: mongoIdSchema.required().label("service"),
  
  description: Joi.string()
    .allow("")
    .max(1000)
    .optional()
    .label("description"),
  scheduledAt: Joi.date()
    .iso()
    .min("now")
    .required()
    .label("scheduledAt"),

  durationMinutes: Joi.number()
    .integer()
    .min(15)
    .max(24 * 60)
    .default(60)
    .label("durationMinutes"),

  price: Joi.number()
    .positive()
    .required()
    .label("price"),

  notes: Joi.string()
    .allow("")
    .max(1000)
    .optional()
    .label("notes")

});

export const updateBookingStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...BOOKING_STATUS_ARRAY)
    .required()
    .label("status")
});


export const getBookingsQuerySchema = Joi.object({

  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .label("page"),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .label("limit"),

  status: Joi.string()
    .valid(...BOOKING_STATUS_ARRAY)
    .optional()
    .label("status"),

  service: mongoIdSchema.optional().label("service")

});