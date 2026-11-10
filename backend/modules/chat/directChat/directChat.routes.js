import express from "express";

import {
  createDirectChat,
  getDirectChat,
  getUserDirectChats,
  deleteDirectChatForUser,
  blockDirectChatUser,
  unBlockDirectChatUser
} from "./directChat.controller.js";

import {
  createDirectChatSchema,
  paramsChatIdSchema,
} from "./directChat.validation.js";

import {validate} from "../../../middlewares/validate.middleware.js";
import { protect } from "../../../middlewares/protect.middleware.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = express.Router();

router.use(protect({profile:true}));

router.post(
    "/",
    validate(createDirectChatSchema, "body"),
    asyncHandler(createDirectChat)
);

router.get(
  "/user",
  asyncHandler(getUserDirectChats)
);

router.get(
  "/:chatId",
  validate(paramsChatIdSchema, "params"),
  asyncHandler(getDirectChat)
);


router.patch(
  "/:chatId/delete",
  validate(paramsChatIdSchema, "params"),
  asyncHandler(deleteDirectChatForUser)
);

router.patch(
  "/:chatId/block",
  validate(paramsChatIdSchema, "params"),
  asyncHandler(blockDirectChatUser)
);


router.patch(
  "/:chatId/unblock",
  validate(paramsChatIdSchema, "params"),
  asyncHandler(unBlockDirectChatUser)
);

export default router;