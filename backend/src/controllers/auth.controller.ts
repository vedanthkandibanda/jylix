import type { Request, Response } from "express";

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from "../services/auth.service.js";

import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validators/auth.validator.js";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

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

export const register = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = registerSchema.parse(req.body);

    const result = await registerUser(input);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "issues" in error
    ) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message ===
        "An account with this email already exists"
    ) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = loginSchema.parse(req.body);

    const result = await loginUser(input);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "issues" in error
    ) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
};

export const refresh = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = refreshTokenSchema.parse(req.body);

    const result = await refreshUserSession(
      input.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "Session refreshed successfully",
      data: result,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "issues" in error
    ) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const input = refreshTokenSchema.parse(req.body);

    const authenticatedRequest =
      req as AuthenticatedRequest;

    await logoutUser(
      authenticatedRequest.userId,
      input.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "issues" in error
    ) {
      res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Unable to log out",
    });
  }
};

export const me = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const authenticatedRequest =
    req as AuthenticatedRequest;

  res.status(200).json({
    success: true,
    data: {
      userId: authenticatedRequest.userId,
    },
  });
};
