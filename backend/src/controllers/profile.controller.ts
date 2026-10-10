import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createGoal,
  deleteGoal,
  getFitnessGoals,
  getHealthProfile,
  getProfile,
  getUserPreferences,
  updateGoal,
  updateHealthProfile,
  updateProfile,
  updateUserPreferences,
} from "../services/profile.service.js";

import {
  createGoalSchema,
  updateGoalSchema,
  updateHealthProfileSchema,
  updatePreferencesSchema,
  updateProfileSchema,
} from "../validators/profile.validator.js";

const getUserId = (req: Request): string => {
  return (req as AuthenticatedRequest).userId;
};

const getValidationMessage = (
  error: unknown,
): string => {
  if (
    error &&
    typeof error === "object" &&
    "issues" in error
  ) {
    const issues = (
      error as {
        issues: Array<{ message: string }>;
      }
    ).issues;

    return issues[0]?.message ?? "Invalid request data";
  }

  return "Invalid request data";
};

const isValidationError = (
  error: unknown,
): boolean => {
  return (
    error !== null &&
    typeof error === "object" &&
    "issues" in error
  );
};

export const getProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = getUserId(req);

    const profile = await getProfile(userId);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Profile not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to get profile",
    });
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = updateProfileSchema.parse(
      req.body,
    );

    const userId = getUserId(req);

    const profile = await updateProfile(
      userId,
      input,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    if (isValidationError(error)) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "Profile not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

export const getHealthProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = getUserId(req);

    const healthProfile =
      await getHealthProfile(userId);

    res.status(200).json({
      success: true,
      data: healthProfile,
    });
  } catch (error) {
    console.error(
      "Get health profile error:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Unable to get health profile",
    });
  }
};

export const updateHealthProfileController =
  async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const input =
        updateHealthProfileSchema.parse(req.body);

      const userId = getUserId(req);

      const healthProfile =
        await updateHealthProfile(userId, input);

      res.status(200).json({
        success: true,
        message:
          "Health profile updated successfully",
        data: healthProfile,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({
          success: false,
          message: getValidationMessage(error),
        });
        return;
      }

      console.error(
        "Update health profile error:",
        error,
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update health profile",
      });
    }
  };

export const getPreferencesController =
  async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const userId = getUserId(req);

      const preferences =
        await getUserPreferences(userId);

      res.status(200).json({
        success: true,
        data: preferences,
      });
    } catch (error) {
      console.error(
        "Get preferences error:",
        error,
      );

      res.status(500).json({
        success: false,
        message: "Unable to get preferences",
      });
    }
  };

export const updatePreferencesController =
  async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const input =
        updatePreferencesSchema.parse(req.body);

      const userId = getUserId(req);

      const preferences =
        await updateUserPreferences(
          userId,
          input,
        );

      res.status(200).json({
        success: true,
        message:
          "Preferences updated successfully",
        data: preferences,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({
          success: false,
          message: getValidationMessage(error),
        });
        return;
      }

      console.error(
        "Update preferences error:",
        error,
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update preferences",
      });
    }
  };

export const getGoalsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = getUserId(req);

    const goals = await getFitnessGoals(userId);

    res.status(200).json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.error("Get goals error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to get goals",
    });
  }
};

export const createGoalController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = createGoalSchema.parse(
      req.body,
    );

    const userId = getUserId(req);

    const goal = await createGoal(
      userId,
      input,
    );

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
      data: goal,
    });
  } catch (error) {
    if (isValidationError(error)) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    console.error("Create goal error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create goal",
    });
  }
};

export const updateGoalController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = updateGoalSchema.parse(
      req.body,
    );

    const userId = getUserId(req);

    const goal = await updateGoal(
      userId,
      String(req.params.id),
      input,
    );

    res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      data: goal,
    });
  } catch (error) {
    if (isValidationError(error)) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "Goal not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Update goal error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update goal",
    });
  }
};

export const deleteGoalController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = getUserId(req);

    await deleteGoal(
      userId,
      String(req.params.id),
    );

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Goal not found"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Delete goal error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete goal",
    });
  }
};
