-- ============================================================
-- JYLIX
-- Migration: 002_authentication
-- Purpose: Authentication, refresh sessions and account recovery
-- ============================================================

-- ============================================================
-- 1. ADD EMAIL VERIFICATION STATE TO USERS
-- ============================================================

ALTER TABLE users
ADD COLUMN email_verified_at TIMESTAMPTZ;


-- ============================================================
-- 2. REFRESH TOKENS
-- ============================================================

CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    revoked_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT refresh_tokens_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX refresh_tokens_token_hash_unique
    ON refresh_tokens(token_hash);

CREATE INDEX refresh_tokens_user_id_idx
    ON refresh_tokens(user_id);

CREATE INDEX refresh_tokens_expires_at_idx
    ON refresh_tokens(expires_at);

ALTER TABLE refresh_tokens OWNER TO jylix_app;


-- ============================================================
-- 3. EMAIL VERIFICATION TOKENS
-- ============================================================

CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    used_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT email_verification_tokens_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX email_verification_tokens_hash_unique
    ON email_verification_tokens(token_hash);

CREATE INDEX email_verification_tokens_user_id_idx
    ON email_verification_tokens(user_id);

CREATE INDEX email_verification_tokens_expires_at_idx
    ON email_verification_tokens(expires_at);

ALTER TABLE email_verification_tokens OWNER TO jylix_app;


-- ============================================================
-- 4. PASSWORD RESET TOKENS
-- ============================================================

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    used_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT password_reset_tokens_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX password_reset_tokens_hash_unique
    ON password_reset_tokens(token_hash);

CREATE INDEX password_reset_tokens_user_id_idx
    ON password_reset_tokens(user_id);

CREATE INDEX password_reset_tokens_expires_at_idx
    ON password_reset_tokens(expires_at);

ALTER TABLE password_reset_tokens OWNER TO jylix_app;
