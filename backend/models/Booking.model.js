import mongoose from "mongoose";
import { MODELS } from "../constants/models.constants.js";
import {
  BOOKING_STATUS,
  BOOKING_STATUS_ARRAY,
} from "../constants/booking.constants.js";

const { Schema, Types, model } = mongoose;

const bookingSchema = new Schema(
  {
    booker: {
      type: Types.ObjectId,
      ref: MODELS.USER,
      required: true,
    },

    provider: {
      type: Types.ObjectId,
      ref: MODELS.PROVIDER,
      required:true
    },

    service: {
      type: Types.ObjectId,
      ref: MODELS.SERVICE,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    durationMinutes: {
      type: Number,
      default: 60,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: BOOKING_STATUS_ARRAY,
      default: BOOKING_STATUS.REQUESTED,
    },

    notes: {
      type: String,
      default: "",
    },

    paymentTransaction: {
      type: Types.ObjectId,
      ref: MODELS.PAYMENT_TRANSACTION,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ buyer: 1 });
bookingSchema.index({ service: 1 });
bookingSchema.index({ scheduledAt: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentTransaction: 1 });

export const Booking =
  mongoose.models[MODELS.BOOKING] ||
  model(MODELS.BOOKING, bookingSchema);