import express from "express";
import * as profileController from "./profiles.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createProfileSchema,
  fullProfileSchema,
  getProfilesQuerySchema,
  profileIdSchema,
  updateProfileSchema
} from "./profiles.validation.js";
import { protect, restrictTo} from "../../middlewares/protect.middleware.js";
import {mediaContext} from "../../middlewares/mediaContext.middlware.js"
import { FILE_MAX_SIZES, MEDIA_USAGE_TYPES, NAMESPACES } from "../../constants/media.constants.js";
import { createUpload } from "../../middlewares/upload.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const router = express.Router();

router.post(
  "/",
  protect(),
  createUpload({fields:[
    {
      name:"avatar",
      maxCount:1,
      required:false,
      types:["image/jpeg","image/png"],
      maxSize:FILE_MAX_SIZES.AVATAR
    },
    {
      name:"cover",
      maxCount:1,
      required:false,
      types:["image/jpeg","image/png"],
      maxSize:FILE_MAX_SIZES.COVER
    }
  ]}),
  mediaContext({
    fields:{
      avatar:{
        namespace:NAMESPACES.AVATAR,
        usageType:MEDIA_USAGE_TYPES.AVATAR
      },
      cover:{
        namespace:NAMESPACES.COVER,
        usageType:MEDIA_USAGE_TYPES.COVER
      }
    }
  }),
  validate(createProfileSchema),
  profileController.createProfile
);


router.put(
  "/",
  protect({profile:true}),
  createUpload({fields:[
    {
      name:"avatar",
      maxCount:1,
      required:false,
      types:["image/jpeg","image/png"],
      maxSize:FILE_MAX_SIZES.AVATAR
    },
    {
      name:"cover",
      maxCount:1,
      required:false,
      types:["image/jpeg","image/png"],
      maxSize:FILE_MAX_SIZES.COVER
    }
  ]}),
  mediaContext({
    fields:{
      avatar:{
        namespace:NAMESPACES.AVATAR,
        usageType:MEDIA_USAGE_TYPES.AVATAR
      },
      cover:{
        namespace:NAMESPACES.COVER,
        usageType:MEDIA_USAGE_TYPES.COVER
      }
    }
  }),
  validate(updateProfileSchema),
  profileController.updateProfile
);

router.delete("/",protect({profile:true}), profileController.deleteProfile);

router.delete(
  "/admin/:id",
  protect({profile:true}),
  restrictTo("admin"),
  validate(profileIdSchema,"params"), 
  profileController.deleteProfile
);

router.get("/byUser",protect({profile:true}), profileController.getProfileByUser);

router.get("/:id",validate(profileIdSchema,"params"), profileController.getProfileById);

router.get("/",validate(getProfilesQuerySchema,"query"),profileController.getProfilesByQuery);

router.get(
  "/full/:id",
  protect(),
  validate(fullProfileSchema, "params"),
  asyncHandler(profileController.getFullProfile)
);

export default router;