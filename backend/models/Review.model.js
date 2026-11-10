import mongoose from "mongoose";
import { REVIEW_ENTITYS_ARRAY } from "../constants/review.constants.js";
import { MODELS } from "../constants/models.constants.js";


const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "entityType"
    },

    entityType: {
      type: String,
      required: true,
      enum: REVIEW_ENTITYS_ARRAY
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);


reviewSchema.index(
  { user: 1, entityId: 1, entityType: 1 },
  { unique: true }
);

export const Review = mongoose.model(MODELS.REVIEW, reviewSchema);
