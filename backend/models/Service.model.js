import mongoose from "mongoose";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_ARRAY
} from "../constants/service.constants.js";

import {
  isValidCoordinates
} from "../utils/location.utils.js";
import { MODELS } from "../constants/models.constants.js";

const { Schema } = mongoose;

/**TODO treat services as gigs in fiverr */

const serviceSchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: MODELS.PROVIDER,
      required: true,
      index: true
    },

    images:[
      {
        type: Schema.Types.ObjectId,
        ref: MODELS.MEDIA_ASSET,
        required: true,
      }
    ],

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    description: {
      type: String,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true
    },

    durationHours: {
      type: Number,
      min: 0
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: MODELS.CATEGORY,
      required: true,
      index: true
    },

    categoryPath: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: SERVICE_STATUS_ARRAY,
      default: SERVICE_STATUSES.AVAILABLE,
      index: true
    },

    bookedCount: {
      type: Number,
      default: 0
    },

    ratingSum: {
      type: Number,
      default: 0,
      min: 0
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0
    },

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      index: true
    },

    location: {

      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        validate: {
          validator(value) {
            return (
              !value?.length ||
              (value.length === 2 &&
                isValidCoordinates(value[0], value[1]))
            );
          },
          message: "Coordinates must be [longitude, latitude].",
        },
      },

      fullAddress: {
        type: String,
        trim: true,
        default: "",
      },

    },
  },
  {
    timestamps: true
  }
);


serviceSchema.index({
  provider: 1,
  status: 1
});

serviceSchema.index({
  category: 1,
  price: 1
});

serviceSchema.index({
  categoryPath: 1
});

serviceSchema.index({
  categoryPath: 1,
  price: 1
});

serviceSchema.index({
  location: "2dsphere"
});

export const Service = mongoose.models[MODELS.SERVICE] ||
  mongoose.model(MODELS.SERVICE, serviceSchema); 