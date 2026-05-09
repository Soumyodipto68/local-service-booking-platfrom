import express from "express";

import {
  createProviderProfile,
  getMyProviderProfile,
  toggleAvailability
} from "../controllers/provider.controllers.js";

import { protect }
from "../middleware/auth.middleware.js";

import { authorizeRoles }
from "../middleware/role.middleware.js";

const router = express.Router();


// CREATE PROFILE
router.post(
  "/profile",
  protect,
  authorizeRoles("provider"),
  createProviderProfile
);


// GET MY PROFILE
router.get(
  "/profile/me",
  protect,
  authorizeRoles("provider"),
  getMyProviderProfile
);


// TOGGLE AVAILABILITY
router.patch(
  "/availability",
  protect,
  authorizeRoles("provider"),
  toggleAvailability
);

export default router;