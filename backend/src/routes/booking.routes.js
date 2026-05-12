import express from "express";

import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  acceptBooking,
  startWork,
  completeBooking,
  cancelBooking
}
from "../controllers/booking.controllers.js";

import { protect }from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();


// CUSTOMER CREATE BOOKING
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  upload.single("issueImage"),
  createBooking
);


// CUSTOMER BOOKINGS
router.get(
  "/my",
  protect,
  authorizeRoles("customer"),
  getMyBookings
);


// PROVIDER BOOKINGS
router.get(
  "/provider",
  protect,
  authorizeRoles("provider"),
  getProviderBookings
);


// ACCEPT BOOKING
router.patch(
  "/:id/accept",
  protect,
  authorizeRoles("provider"),
  acceptBooking
);


// START WORK
router.patch(
  "/:id/start",
  protect,
  authorizeRoles("provider"),
  startWork
);


// COMPLETE BOOKING
router.patch(

  "/:id/complete",

  protect,

  authorizeRoles("provider"),

  upload.fields([

    {
      name: "beforeImage",
      maxCount: 1
    },

    {
      name: "afterImage",
      maxCount: 1
    }

  ]),

  completeBooking

);

// CANCEL BOOKING
router.patch(
  "/:id/cancel",
  protect,
  cancelBooking
);

export default router;