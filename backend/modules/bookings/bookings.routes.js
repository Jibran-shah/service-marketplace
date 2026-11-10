import { Router } from "express";

import * as bookingsController from "./bookings.controller.js";

import {
  createBookingSchema,
  paramsBookingIdSchema,
  getBookingsQuerySchema,
  updateBookingStatusSchema
} from "./bookings.validation.js";
import { protect, restrictTo } from "../../middlewares/protect.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const router = Router();

router.post(
  "/",
  protect(),
  validate(createBookingSchema, "body"),
  asyncHandler(bookingsController.createBooking)
);

router.get(
  "/my",
  protect(),
  validate(getBookingsQuerySchema, "query"),
  asyncHandler(bookingsController.getMyBookings)
);

router.get(
  "/:bookingId",
  protect(),
  validate(paramsBookingIdSchema, "params"),
  asyncHandler(bookingsController.getBookingById)
);

router.patch(
  "/:bookingId/pay",
  protect(),
  validate(paramsBookingIdSchema,"params"),
  asyncHandler(bookingsController.payBooking)
)

router.patch(
"/:bookingId/accept",
  protect(),
  validate(paramsBookingIdSchema, "params"),
  asyncHandler(bookingsController.acceptBooking)
);

router.patch(
  "/:bookingId/complete",
  protect(),
  validate(paramsBookingIdSchema, "params"),
  asyncHandler(bookingsController.completeBooking)
);

router.patch(
  "/:bookingId/cancel",
  protect(),
  validate(paramsBookingIdSchema, "params"),
  asyncHandler(bookingsController.cancelBooking)
);

router.delete(
  "/:bookingId",
  protect(),
  validate(paramsBookingIdSchema, "params"),
  asyncHandler(bookingsController.deleteBooking)
);

export default router;