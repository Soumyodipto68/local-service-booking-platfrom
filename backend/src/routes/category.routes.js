import express from "express";

import {
  createCategory,
  getAllCategories
} from "../controllers/category.controllers.js";

import { protect }
from "../middleware/auth.middleware.js";

import { authorizeRoles }
from "../middleware/role.middleware.js";

const router = express.Router();


// ADMIN CREATE CATEGORY
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCategory
);


// PUBLIC GET CATEGORIES
router.get(
  "/",
  getAllCategories
);

export default router;