-- ============================================================
-- JYLIX
-- Migration: 001_create_user_core
-- Purpose: Core user, health, goals and preferences
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. USERS
-- ============================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(30),

    password_hash TEXT NOT NULL,

    date_of_birth DATE,

    gender VARCHAR(30),

    profile_photo_url TEXT,

    country VARCHAR(100),

    state VARCHAR(100),

    city VARCHAR(100),

    preferred_language VARCHAR(20) NOT NULL DEFAULT 'en',

    account_status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_account_status_check
        CHECK (account_status IN ('active', 'suspended', 'deleted'))
);

CREATE UNIQUE INDEX users_email_unique
    ON users (LOWER(email));


-- ============================================================
-- 2. HEALTH PROFILES
-- ============================================================

CREATE TABLE health_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE,

    height_cm DECIMAL(5,2),

    weight_kg DECIMAL(6,2),

    body_fat_percent DECIMAL(5,2),

    activity_level VARCHAR(30),

    experience_level VARCHAR(30),

    health_conditions JSONB NOT NULL DEFAULT '[]'::jsonb,

    injuries JSONB NOT NULL DEFAULT '[]'::jsonb,

    allergies JSONB NOT NULL DEFAULT '[]'::jsonb,

    sleep_hours DECIMAL(4,2),

    stress_level VARCHAR(30),

    water_intake_ml INTEGER,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT health_profiles_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT health_profiles_height_check
        CHECK (height_cm IS NULL OR height_cm > 0),

    CONSTRAINT health_profiles_weight_check
        CHECK (weight_kg IS NULL OR weight_kg > 0),

    CONSTRAINT health_profiles_body_fat_check
        CHECK (
            body_fat_percent IS NULL
            OR body_fat_percent >= 0
            AND body_fat_percent <= 100
        ),

    CONSTRAINT health_profiles_sleep_check
        CHECK (
            sleep_hours IS NULL
            OR sleep_hours >= 0
            AND sleep_hours <= 24
        ),

    CONSTRAINT health_profiles_water_check
        CHECK (water_intake_ml IS NULL OR water_intake_ml >= 0)
);


-- ============================================================
-- 3. FITNESS GOALS
-- ============================================================

CREATE TABLE fitness_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    goal_type VARCHAR(50) NOT NULL,

    target_weight_kg DECIMAL(6,2),

    target_date DATE,

    priority INTEGER NOT NULL DEFAULT 1,

    status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fitness_goals_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fitness_goals_priority_check
        CHECK (priority > 0),

    CONSTRAINT fitness_goals_target_weight_check
        CHECK (
            target_weight_kg IS NULL
            OR target_weight_kg > 0
        ),

    CONSTRAINT fitness_goals_status_check
        CHECK (
            status IN ('active', 'completed', 'paused', 'cancelled')
        )
);

CREATE INDEX fitness_goals_user_id_idx
    ON fitness_goals(user_id);


-- ============================================================
-- 4. USER PREFERENCES
-- ============================================================

CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE,

    diet_type VARCHAR(30),

    favorite_foods JSONB NOT NULL DEFAULT '[]'::jsonb,

    foods_to_avoid JSONB NOT NULL DEFAULT '[]'::jsonb,

    monthly_food_budget DECIMAL(10,2),

    preferred_workout_location VARCHAR(30),

    available_equipment JSONB NOT NULL DEFAULT '[]'::jsonb,

    workout_days_per_week INTEGER,

    session_duration_minutes INTEGER,

    preferred_workout_time TIME,

    unit_system VARCHAR(20) NOT NULL DEFAULT 'metric',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT user_preferences_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT user_preferences_budget_check
        CHECK (
            monthly_food_budget IS NULL
            OR monthly_food_budget >= 0
        ),

    CONSTRAINT user_preferences_workout_days_check
        CHECK (
            workout_days_per_week IS NULL
            OR workout_days_per_week BETWEEN 0 AND 7
        ),

    CONSTRAINT user_preferences_duration_check
        CHECK (
            session_duration_minutes IS NULL
            OR session_duration_minutes > 0
        ),

    CONSTRAINT user_preferences_unit_check
        CHECK (
            unit_system IN ('metric', 'imperial')
        )
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX health_profiles_user_id_idx
    ON health_profiles(user_id);

CREATE INDEX user_preferences_user_id_idx
    ON user_preferences(user_id);


-- ============================================================
-- APPLICATION OWNERSHIP
-- ============================================================

ALTER TABLE users OWNER TO jylix_app;
ALTER TABLE health_profiles OWNER TO jylix_app;
ALTER TABLE fitness_goals OWNER TO jylix_app;
ALTER TABLE user_preferences OWNER TO jylix_app;
