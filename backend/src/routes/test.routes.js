import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  customerDashboard
} from "../controllers/test.controllers.js";

const router = express.Router();

router.get(
  "/customer-dashboard",
  protect,
  authorizeRoles("customer"),
  customerDashboard
);

export default router;