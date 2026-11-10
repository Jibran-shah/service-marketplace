import mongoose from "mongoose";
import {
  GROUP_CHAT_ROLES,
  GROUP_CHAT_ROLES_ARRAY,
} from "../constants/chat.constants.js";
import { MODELS } from "../constants/models.constants.js";

const { Schema, model, Types } = mongoose;

/* =========================
   GROUP CHAT MODEL
========================= */

const GroupChatSchema = new Schema(
  {
    /*
    Group metadata
    */
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    avatar: {
      type: Types.ObjectId,
      ref: MODELS.MEDIA_ASSET,
    },

    /*
    Group creator
    */
    createdBy: {
      type: Types.ObjectId,
      ref: MODELS.USER,
      required: true,
    },

    /*
    Members
    */
    members: [
      {
        userId: {
          type: Types.ObjectId,
          ref: MODELS.USER,
          required: true,
        },

        role: {
          type: String,
          enum: GROUP_CHAT_ROLES_ARRAY,
          default: GROUP_CHAT_ROLES.MEMBER,
        },

        joinedAt: {
          type: Date,
          default: Date.now,
        },

        leftAt: {
          type: Date,
          default: null,
        },

        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    memberCount: {
      type: Number,
      default: 0,
    },

    settings: {
      onlyAdminsCanMessage: {
        type: Boolean,
        default: false,
      },

      onlyAdminsCanAddMembers: {
        type: Boolean,
        default: false,
      },

      onlyAdminsCanEditGroup: {
        type: Boolean,
        default: true,
      },

      messageHistoryVisibleToNewMembers: {
        type: Boolean,
        default: true,
      },
    },

    inviteCode: {
      type: String,
      default: null,
    },

    lastMessage: {
      messageId: {
        type: Types.ObjectId,
        ref: MODELS.MESSAGE,
      },

      senderId: {
        type: Types.ObjectId,
        ref: MODELS.USER,
      },

      content: {
        type: String,
        default: "",
      },

      updatedAt: Date,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GroupChatSchema.pre("validate", async function () {
  const activeMembers = this.members.filter(
    (member) => member.isActive
  );

  if (activeMembers.length < 2) {
    throw new Error("Group chat must have at least 2 active members");
  }

  const userIds = activeMembers.map((member) =>
    member.userId.toString()
  );

  if (new Set(userIds).size !== userIds.length) {
    throw new Error("Duplicate members are not allowed");
  }

  const adminCount = activeMembers.filter(
    (member) => member.role === GROUP_CHAT_ROLES.ADMIN
  ).length;

  if (adminCount < 1) {
    throw new Error("Group chat must have at least one admin");
  }

  const creatorExists = activeMembers.some(
    (member) =>
      member.userId.toString() === this.createdBy.toString()
  );

  if (!creatorExists) {
    throw new Error("Group creator must remain an active member");
  }

  this.memberCount = activeMembers.length;
});


GroupChatSchema.index({
  "members.userId": 1,
  isDeleted: 1,
  isArchived: 1,
});

/*
Search support
*/
GroupChatSchema.index({
  name: "text",
  description: "text",
});

/*
Lifecycle filtering
*/
GroupChatSchema.index({
  isArchived: 1,
  isDeleted: 1,
});

/*
Creator lookup
*/
GroupChatSchema.index({
  createdBy: 1,
});

/*
Invite code lookup
*/
GroupChatSchema.index({
  inviteCode: 1,
});

export const GroupChat = model(
  MODELS.GROUP_CHAT,
  GroupChatSchema
);