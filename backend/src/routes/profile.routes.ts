import { Router } from "express";

import {
  getProfileController,
  updateProfileController,
  getHealthProfileController,
  updateHealthProfileController,
  getPreferencesController,
  updatePreferencesController,
  getGoalsController,
  createGoalController,
  updateGoalController,
  deleteGoalController,
} from "../controllers/profile.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// All profile routes require authentication
router.use(requireAuth);

// Basic profile
router.get("/", getProfileController);
router.put("/", updateProfileController);

// Health profile
router.get("/health", getHealthProfileController);
router.put("/health", updateHealthProfileController);

// User preferences
router.get("/preferences", getPreferencesController);
router.put("/preferences", updatePreferencesController);

// Fitness goals
router.get("/goals", getGoalsController);
router.post("/goals", createGoalController);
router.put("/goals/:id", updateGoalController);
router.delete("/goals/:id", deleteGoalController);

export default router;