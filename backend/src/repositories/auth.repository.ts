import { db } from "../config/db.js";
import type {
  AuthUser,
  RegisterInput,
} from "../types/auth.types.js";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  profile_photo_url: string | null;
  email_verified_at: Date | null;
};

export const findUserByEmail = async (
  email: string,
): Promise<UserRow | null> => {
  const result = await db.query<UserRow>(
    `
      SELECT
        id,
        name,
        email,
        password_hash,
        profile_photo_url,
        email_verified_at
      FROM users
      WHERE LOWER(email) = LOWER($1)
        AND account_status = 'active'
      LIMIT 1
    `,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserById = async (
  userId: string,
): Promise<AuthUser | null> => {
  const result = await db.query<AuthUser>(
    `
      SELECT
        id,
        name,
        email,
        profile_photo_url AS "profilePhotoUrl",
        email_verified_at AS "emailVerifiedAt"
      FROM users
      WHERE id = $1
        AND account_status = 'active'
      LIMIT 1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const createUser = async (
  input: RegisterInput,
  passwordHash: string,
): Promise<AuthUser> => {
  const result = await db.query<AuthUser>(
    `
      INSERT INTO users (
        name,
        email,
        password_hash
      )
      VALUES ($1, LOWER($2), $3)
      RETURNING
        id,
        name,
        email,
        profile_photo_url AS "profilePhotoUrl",
        email_verified_at AS "emailVerifiedAt"
    `,
    [input.name, input.email, passwordHash],
  );

  return result.rows[0];
};

export const saveRefreshToken = async (
  userId: string,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> => {
  await db.query(
    `
      INSERT INTO refresh_tokens (
        user_id,
        token_hash,
        expires_at
      )
      VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt],
  );
};

export const findRefreshToken = async (
  tokenHash: string,
): Promise<{
  id: string;
  userId: string;
  expiresAt: Date;
  revokedAt: Date | null;
} | null> => {
  const result = await db.query<{
    id: string;
    userId: string;
    expiresAt: Date;
    revokedAt: Date | null;
  }>(
    `
      SELECT
        id,
        user_id AS "userId",
        expires_at AS "expiresAt",
        revoked_at AS "revokedAt"
      FROM refresh_tokens
      WHERE token_hash = $1
      LIMIT 1
    `,
    [tokenHash],
  );

  return result.rows[0] ?? null;
};

export const revokeRefreshToken = async (
  tokenId: string,
): Promise<void> => {
  await db.query(
    `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE id = $1
        AND revoked_at IS NULL
    `,
    [tokenId],
  );
};

export const findActiveRefreshTokensByUserId = async (
  userId: string,
): Promise<
  Array<{
    id: string;
    tokenHash: string;
    expiresAt: Date;
    revokedAt: Date | null;
  }>
> => {
  const result = await db.query<{
    id: string;
    tokenHash: string;
    expiresAt: Date;
    revokedAt: Date | null;
  }>(
    `
      SELECT
        id,
        token_hash AS "tokenHash",
        expires_at AS "expiresAt",
        revoked_at AS "revokedAt"
      FROM refresh_tokens
      WHERE user_id = $1
        AND revoked_at IS NULL
        AND expires_at > NOW()
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows;
};