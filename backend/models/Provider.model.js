import mongoose from "mongoose";
import { isValidCoordinates } from "../utils/location.utils.js";
import { MODELS } from "../constants/models.constants.js";

const { Schema } = mongoose;

const providerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    skills: {
      type: [String],
      set: (arr = []) =>
        [...new Set(arr.map(s => s.trim().toLowerCase()))],
      default: [],
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    location: {
      coordinates: {
        type: [Number],

        validate: {
          validator(value) {
            if (!value || value.length === 0) return true;

            return (
              Array.isArray(value) &&
              value.length === 2 &&
              isValidCoordinates(value[0], value[1])
            );
          },
          message:
            "Coordinates must be [longitude, latitude] with valid ranges.",
        },
      },

      fullAddress: {
        type: String,
        trim: true
      },
    },

    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },

    ratingSum: {
      type: Number,
      default: 0,
      min: 0,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


providerSchema.index({ experienceYears: 1 });
providerSchema.index({ ratingAverage: -1 });
providerSchema.index({ ratingCount: -1 });
providerSchema.index({
  "location.coordinates": "2dsphere",
});


export const Provider = mongoose.models[MODELS.PROVIDER] || mongoose.model(
  MODELS.PROVIDER,
  providerSchema
);