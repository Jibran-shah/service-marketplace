import mongoose from "mongoose";
import { MODELS } from "../constants/models.constants";
import { REPORT_ENTITY_TYPES_ARRAY } from "../constants/report.constants";

const { Schema, model, Types } = mongoose;

const ReportSchema = new Schema(
  {
    reporter: {
      type: Types.ObjectId,
      ref: MODELS.USER,
      required: true,
      index: true,
    },

    entityId: {
      type: Types.ObjectId,
      required: true,
      refPath: "entityType",
      index: true,
    },

    entityType: {
      type: String,
      required: true,
      enum: REPORT_ENTITY_TYPES_ARRAY,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: REFPORT_STATUSES_ARRAY,
      default: REFPORT_STATUS.PENDING,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ReportSchema.index(
  { reporter: 1, entityId: 1, entityType: 1 },
  { unique: true }
);

const Report = model(MODELS.REPORT, ReportSchema);

export default Report;