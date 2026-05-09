import express from "express";

import {
  createReview
} from "../controllers/review.controllers.js";

import { protect }
from "../middleware/auth.middleware.js";

import { authorizeRoles }
from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createReview
);

export default router;