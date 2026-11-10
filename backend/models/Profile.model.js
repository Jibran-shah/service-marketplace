import mongoose from "mongoose";
import { PROFILE_ROLE, PROFILE_ROLES_ARRAY } from "../constants/profile.constants.js";
import { MODELS } from "../constants/models.constants.js";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref:MODELS.MEDIA_ASSET
    },

    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref:MODELS.MEDIA_ASSET
    },

    phone: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      maxlength: 500
    },

    country: {
      type: String
    },

    city: {
      type: String
    },

    address: {
      type: String
    },

    role: {
        type: [String],
        enum: PROFILE_ROLES_ARRAY,
        default: [PROFILE_ROLE.BUYER],
        index:true
    }
  },
  {
    timestamps: true
  }
);

export const Profile = mongoose.models.Profile || mongoose.model(MODELS.PROFILE, profileSchema);