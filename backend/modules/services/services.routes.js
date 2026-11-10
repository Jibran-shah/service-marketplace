import express from "express";
import * as serviceController from "./services.controller.js";

import { protect } from "../../middlewares/protect.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createServiceSchema,
  updateServiceSchema,
  serviceQuerySchema,
  idParamSchema
} from "./services.validation.js";
import { MEDIA_USAGE_TYPES, NAMESPACES } from "../../constants/media.constants.js";
import { createUpload } from "../../middlewares/upload.middleware.js"
import { mediaContext } from "../../middlewares/mediaContext.middlware.js"

const router = express.Router();

router.post(
  "/",
  protect({provider:true}),
  createUpload({
    fields: [
      {
        name: "imageFiles",
        maxCount: 10,
        required: false
      }
    ]
  }),

  mediaContext({
    fields: {
      imageFiles: {
        namespace: NAMESPACES.SERVICE_IMAGES,
        usageType: MEDIA_USAGE_TYPES.SERVICE_IMAGE
      }
    }
  }),
  validate(createServiceSchema),
  asyncHandler(serviceController.createService)
);


router.get(
  "/",
  validate(serviceQuerySchema,"query"),
  asyncHandler(serviceController.getServices)
);


router.get(
  "/me",
  protect({provider:true}),
  asyncHandler(serviceController.getServicesByProvider)
);


router.get(
  "/category/:categoryId",
  validate(idParamSchema,"params"),
  asyncHandler(serviceController.getByCategory)
);


router.get(
  "/:id",
  validate(idParamSchema,"params"),
  asyncHandler(serviceController.getServiceById)
);


router.patch(
  "/:id",
  protect({provider:true}),
  createUpload({
    fields: [
      {
        name: "imageFiles",
        maxCount: 10,
        required: false
      }
    ]
  }),

  mediaContext({
    fields: {
      imageFiles: {
        namespace: NAMESPACES.SERVICE_IMAGES,
        usageType: MEDIA_USAGE_TYPES.SERVICE_IMAGE
      }
    }
  }),
  validate(idParamSchema,"params"),
  validate(updateServiceSchema),
  asyncHandler(serviceController.updateService)
);


router.delete(
  "/:id",
  protect({provider:true}),
  validate(idParamSchema,"params"),
  asyncHandler(serviceController.deleteService)
);


export default router;