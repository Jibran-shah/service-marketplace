import express from "express";
const router = express.Router();

import {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
  bulkDeleteProviders,
  updateProviderByUser,
  deleteProviderAdmin,
  getProviderByUser
} from "./providers.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { bulkDeleteProviderSchema, createProviderSchema, providerIdParamSchema, updateProviderSchema } from "./providers.validation.js";
import { protect, restrictTo } from "../../middlewares/protect.middleware.js";
import { USER_ROLES } from "../../constants/user.constants.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

router.post("/bulk-delete",
  protect(),
  restrictTo(USER_ROLES.ADMIN),
  validate(bulkDeleteProviderSchema) , 
  asyncHandler(bulkDeleteProviders)
);

router.get(
  "/byUser",
  protect(),
  asyncHandler(getProviderByUser)
);

router.get("/", asyncHandler(getAllProviders));

router.post("/",
  protect({profile:true}),
  validate(createProviderSchema), 
  asyncHandler(createProvider));

router.put(
  "/byUser",
  protect({provider:true}),
  validate(updateProviderSchema),
  asyncHandler(updateProviderByUser)
);

router.put(
  "/:id",
  protect({provider:true}),
  validate(providerIdParamSchema, "params"),
  validate(updateProviderSchema),
  asyncHandler(updateProvider)
);

router.delete(
  "/",
  protect({provider:true}),
  asyncHandler(deleteProvider)
);

router.delete(
  "/:id",
  protect({provider:true}),
  restrictTo("admin"),
  validate(providerIdParamSchema,"params"),
  asyncHandler(deleteProviderAdmin)
);

router.get(
  "/:id",
  validate(providerIdParamSchema, "params"),
  asyncHandler(getProviderById)
);

export default router;