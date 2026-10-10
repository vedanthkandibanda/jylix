import {
  createUser,
  findActiveRefreshTokensByUserId,
  findUserByEmail,
  findUserById,
  revokeRefreshToken,
  saveRefreshToken,
} from "../repositories/auth.repository.js";

import {
  comparePassword,
  compareToken,
  hashPassword,
  hashToken,
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth.types.js";

const REFRESH_TOKEN_DAYS = 30;

const getRefreshTokenExpiry = (): Date => {
  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + REFRESH_TOKEN_DAYS,
  );

  return expiresAt;
};

export const registerUser = async (
  input: RegisterInput,
): Promise<AuthResponse> => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await createUser(input, passwordHash);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const refreshTokenHash = await hashToken(refreshToken);

  await saveRefreshToken(
    user.id,
    refreshTokenHash,
    getRefreshTokenExpiry(),
  );

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const loginUser = async (
  input: LoginInput,
): Promise<AuthResponse> => {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordValid = await comparePassword(
    input.password,
    user.password_hash,
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const refreshTokenHash = await hashToken(refreshToken);

  await saveRefreshToken(
    user.id,
    refreshTokenHash,
    getRefreshTokenExpiry(),
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePhotoUrl: user.profile_photo_url,
      emailVerifiedAt: user.email_verified_at,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const refreshUserSession = async (
  refreshToken: string,
): Promise<AuthResponse> => {
  const payload = verifyRefreshToken(refreshToken);

  const storedTokens =
    await findActiveRefreshTokensByUserId(payload.userId);

  let matchedToken:
    | {
        id: string;
        expiresAt: Date;
      }
    | undefined;

  for (const storedToken of storedTokens) {
    const matches = await compareToken(
      refreshToken,
      storedToken.tokenHash,
    );

    if (matches) {
      matchedToken = {
        id: storedToken.id,
        expiresAt: storedToken.expiresAt,
      };

      break;
    }
  }

  if (!matchedToken) {
    throw new Error("Invalid or revoked refresh token");
  }

  if (matchedToken.expiresAt <= new Date()) {
    throw new Error("Refresh token has expired");
  }

  const user = await findUserById(payload.userId);

  if (!user) {
    throw new Error("User account not found");
  }

  // Rotate the refresh token.
  await revokeRefreshToken(matchedToken.id);

  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  const newRefreshTokenHash =
    await hashToken(newRefreshToken);

  await saveRefreshToken(
    user.id,
    newRefreshTokenHash,
    getRefreshTokenExpiry(),
  );

  return {
    user,
    tokens: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  };
};

export const logoutUser = async (
  userId: string,
  refreshToken: string,
): Promise<void> => {
  const payload = verifyRefreshToken(refreshToken);

  if (payload.userId !== userId) {
    throw new Error("Invalid refresh token");
  }

  const storedTokens =
    await findActiveRefreshTokensByUserId(userId);

  for (const storedToken of storedTokens) {
    const matches = await compareToken(
      refreshToken,
      storedToken.tokenHash,
    );

    if (matches) {
      await revokeRefreshToken(storedToken.id);
      return;
    }
  }

  throw new Error("Refresh token not found");
};