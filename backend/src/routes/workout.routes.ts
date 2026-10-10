import { Router } from "express";

import {
  getExercisesController,
  getExerciseController,
  createExerciseController,
  getWorkoutPlansController,
  getWorkoutPlanController,
  createWorkoutPlanController,
  getWorkoutPlanExercisesController,
  addExerciseToWorkoutPlanController,
  createWorkoutSessionController,
getWorkoutSessionsController,
getWorkoutSessionController,
updateWorkoutSessionController,
getWorkoutSessionExercisesController,
addExerciseToSessionController,
updateSessionExerciseController,
} from "../controllers/workout.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Exercise library
// Exercises are currently readable only by authenticated users.
router.get("/exercises", requireAuth, getExercisesController);
router.get("/exercises/:id", requireAuth, getExerciseController);
router.post("/exercises", requireAuth, createExerciseController);

// Workout plans
router.get("/plans", requireAuth, getWorkoutPlansController);
router.get("/plans/:id", requireAuth, getWorkoutPlanController);
router.post("/plans", requireAuth, createWorkoutPlanController);
router.get(
  "/plans/:id/exercises",
  requireAuth,
  getWorkoutPlanExercisesController,
);

router.post(
  "/plans/:id/exercises",
  requireAuth,
  addExerciseToWorkoutPlanController,
);

// ============================================================
// Workout Sessions
// ============================================================

router.post(
  "/sessions",
  requireAuth,
  createWorkoutSessionController,
);

router.get(
  "/sessions",
  requireAuth,
  getWorkoutSessionsController,
);

router.get(
  "/sessions/:id",
  requireAuth,
  getWorkoutSessionController,
);

router.put(
  "/sessions/:id",
  requireAuth,
  updateWorkoutSessionController,
);

// ============================================================
// Workout Session Exercises
// ============================================================

router.get(
  "/sessions/:id/exercises",
  requireAuth,
  getWorkoutSessionExercisesController,
);

router.post(
  "/sessions/:id/exercises",
  requireAuth,
  addExerciseToSessionController,
);

router.put(
  "/session-exercises/:id",
  requireAuth,
  updateSessionExerciseController,
);

export default router;