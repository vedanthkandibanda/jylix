import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export type AccessTokenPayload = {
  userId: string;
  type: "access";
};

export type RefreshTokenPayload = {
  userId: string;
  type: "refresh";
};

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "30d";

export const generateAccessToken = (userId: string): string => {
  const payload: AccessTokenPayload = {
    userId,
    type: "access",
  };

  return jwt.sign(payload, env.accessTokenSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId: string): string => {
  const payload: RefreshTokenPayload = {
    userId,
    type: "refresh",
  };

  return jwt.sign(payload, env.refreshTokenSecret, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (
  token: string,
): AccessTokenPayload => {
  const payload = jwt.verify(token, env.accessTokenSecret);

  if (
    typeof payload === "string" ||
    payload.type !== "access" ||
    typeof payload.userId !== "string"
  ) {
    throw new Error("Invalid access token");
  }

  return {
    userId: payload.userId,
    type: "access",
  };
};

export const verifyRefreshToken = (
  token: string,
): RefreshTokenPayload => {
  const payload = jwt.verify(token, env.refreshTokenSecret);

  if (
    typeof payload === "string" ||
    payload.type !== "refresh" ||
    typeof payload.userId !== "string"
  ) {
    throw new Error("Invalid refresh token");
  }

  return {
    userId: payload.userId,
    type: "refresh",
  };
};