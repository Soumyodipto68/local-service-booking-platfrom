import express from "express";

import {
  createProviderProfile,
  getMyProviderProfile,
  toggleAvailability,
  approveProvider,
  searchProviders,
  getProviderById
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


// APPROVE PROVIDER (ADMIN)
router.patch(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveProvider
);
export default router;

//SEARCH PROVIDERS
router.get(
  "/search",
  searchProviders
);

// GET SINGLE PROVIDER
router.get(
  "/:id",
  getProviderById
);
