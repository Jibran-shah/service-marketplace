import mongoose from "mongoose";
import { MODELS } from "../constants/models.constants.js";

const pushSubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: true,
    },
    subscription: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  MODELS.PUSH_SUBSCRIPTION,
  pushSubscriptionSchema
);