import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";

export type AuthenticatedRequest = Request & {
  userId: string;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      success: false,
      message: "Invalid authorization header",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    (req as AuthenticatedRequest).userId = payload.userId;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};