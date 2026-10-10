import type { Request, Response } from "express";
import {
  createExerciseSchema,
  createWorkoutPlanSchema,
} from "../validators/workout.validator.js";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  addExerciseToPlan,
  addExerciseToSession,
  addExercise,
addWorkoutPlan,
  createWorkoutSession,
  getExercise,
  getExercises,
  getWorkoutPlan,
  getWorkoutPlanExercises,
  getWorkoutPlans,
  getWorkoutSession,
  getWorkoutSessionExercises,
  getWorkoutSessions,
  updateSessionExercise,
  updateWorkoutSession,
} from "../services/workout.service.js";

// ============================================================
// Exercise Library
// ============================================================

export const getExercisesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const exercises = await getExercises();

    res.status(200).json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    console.error("Get exercises error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch exercises",
    });
  }
};

export const getExerciseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const exercise = await getExercise(String(req.params.id));

    res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Exercise not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Get exercise error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch exercise",
    });
  }
};

export const createExerciseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = createExerciseSchema.parse(req.body);

    const exercise = await addExercise(input);

    res.status(201).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Invalid exercise data",
        errors: error,
      });
      return;
    }

    console.error("Create exercise error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create exercise",
    });
  }
};

// ============================================================
// Workout Plans
// ============================================================

export const getWorkoutPlansController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const plans = await getWorkoutPlans(userId);

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error("Get workout plans error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workout plans",
    });
  }
};

export const getWorkoutPlanController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const planId = String(req.params.id);

    const plan = await getWorkoutPlan(userId, planId);

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Workout plan not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Get workout plan error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workout plan",
    });
  }
};

export const createWorkoutPlanController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = createWorkoutPlanSchema.parse(req.body);

    const userId = (req as AuthenticatedRequest).userId;

    const plan = await addWorkoutPlan(userId, input);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Invalid workout plan data",
        errors: error,
      });
      return;
    }

    console.error("Create workout plan error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create workout plan",
    });
  }
};

export const getWorkoutPlanExercisesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const workoutPlanId = String(req.params.id);

    const exercises = await getWorkoutPlanExercises(
      userId,
      workoutPlanId,
    );

    res.status(200).json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Workout plan not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Get workout plan exercises error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workout plan exercises",
    });
  }
};

export const addExerciseToWorkoutPlanController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const workoutPlanId = String(req.params.id);

    const input = {
      ...req.body,
      workoutPlanId,
    };

    const exercise = await addExerciseToPlan(userId, input);

    res.status(201).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Workout plan not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "Exercise not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Add exercise to workout plan error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add exercise to workout plan",
    });
  }
};

export const createWorkoutSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const session = await createWorkoutSession(userId, {
      workoutPlanId: req.body.workoutPlanId,
      startedAt: req.body.startedAt,
    });

    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create workout session",
    });
  }
};

export const getWorkoutSessionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const sessions = await getWorkoutSessions(userId);

    res.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch workout sessions",
    });
  }
};

export const getWorkoutSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const sessionId = String(req.params.id);

    const session = await getWorkoutSession(
      userId,
      sessionId,
    );

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Workout session not found",
    });
  }
};

export const updateWorkoutSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const sessionId = String(req.params.id);

    const session = await updateWorkoutSession(
      userId,
      sessionId,
      req.body,
    );

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update workout session",
    });
  }
};

export const getWorkoutSessionExercisesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const sessionId = String(req.params.id);

    const exercises = await getWorkoutSessionExercises(
      userId,
      sessionId,
    );

    res.json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch session exercises",
    });
  }
};

export const addExerciseToSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const sessionId = String(req.params.id);

    const exercise = await addExerciseToSession(
      userId,
      {
        sessionId,
        exerciseId: req.body.exerciseId,
        exerciseOrder: req.body.exerciseOrder,
      },
    );

    res.status(201).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add exercise to session",
    });
  }
};

export const updateSessionExerciseController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const sessionExerciseId = String(req.params.id);

    const exercise = await updateSessionExercise(
      userId,
      sessionExerciseId,
      {
        completed: req.body.completed,
        setsCompleted: req.body.setsCompleted,
        repsCompleted: req.body.repsCompleted,
        weightUsedKg: req.body.weightUsedKg,
        durationSeconds: req.body.durationSeconds,
        caloriesBurned: req.body.caloriesBurned,
        notes: req.body.notes,
      },
    );

    res.json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update session exercise",
    });
  }
};