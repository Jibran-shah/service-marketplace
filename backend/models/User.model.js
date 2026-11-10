import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { InternalServerError } from "../errors/index.js";
import { USER_ROLES, USER_ROLES_ARRAY } from "../constants/user.constants.js";
import { AUTH_CONFIG } from "../config/auth.config.js";
import { MODELS } from "../constants/models.constants.js";

const userSchema = new mongoose.Schema({

  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      index:true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: USER_ROLES_ARRAY,
    default: USER_ROLES.USER
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.PROFILE,
    default: null
  },

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.PROVIDER,
    default: null
  },

  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.SHOP,
    default: null
  }},

  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) throw new InternalServerError("Password not selected in query");
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, AUTH_CONFIG.BCRYPT.SALT_ROUNDS);
});


export const User = mongoose.models.User || mongoose.model(
  MODELS.USER,
  userSchema
);