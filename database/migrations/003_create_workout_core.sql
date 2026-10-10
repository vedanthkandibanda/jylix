-- ============================================================
-- Jylix Workout Core
-- Migration 003
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. EXERCISES
-- Master exercise library
-- ============================================================

CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    primary_muscles JSONB NOT NULL DEFAULT '[]'::jsonb,
    secondary_muscles JSONB NOT NULL DEFAULT '[]'::jsonb,

    difficulty VARCHAR(30),
    equipment JSONB NOT NULL DEFAULT '[]'::jsonb,
    movement_pattern VARCHAR(50),
    exercise_type VARCHAR(50),

    instructions TEXT,
    common_mistakes JSONB NOT NULL DEFAULT '[]'::jsonb,
    alternatives JSONB NOT NULL DEFAULT '[]'::jsonb,
    progressions JSONB NOT NULL DEFAULT '[]'::jsonb,
    regressions JSONB NOT NULL DEFAULT '[]'::jsonb,

    video_url TEXT,
    image_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS exercises_category_idx
    ON exercises (category);

CREATE INDEX IF NOT EXISTS exercises_difficulty_idx
    ON exercises (difficulty);

CREATE INDEX IF NOT EXISTS exercises_name_idx
    ON exercises (LOWER(name));


-- ============================================================
-- 2. WORKOUT PLANS
-- A user's planned workout program
-- ============================================================

CREATE TABLE IF NOT EXISTS workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    goal VARCHAR(50),
    difficulty VARCHAR(30),

    duration_weeks INTEGER,
    sessions_per_week INTEGER,
    estimated_session_minutes INTEGER,

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('draft', 'active', 'completed', 'archived')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT workout_plans_duration_check
        CHECK (duration_weeks IS NULL OR duration_weeks > 0),

    CONSTRAINT workout_plans_sessions_check
        CHECK (
            sessions_per_week IS NULL
            OR sessions_per_week BETWEEN 1 AND 7
        ),

    CONSTRAINT workout_plans_duration_minutes_check
        CHECK (
            estimated_session_minutes IS NULL
            OR estimated_session_minutes > 0
        )
);

CREATE INDEX IF NOT EXISTS workout_plans_user_idx
    ON workout_plans (user_id);

CREATE INDEX IF NOT EXISTS workout_plans_user_status_idx
    ON workout_plans (user_id, status);


-- ============================================================
-- 3. WORKOUT PLAN EXERCISES
-- Exercises belonging to a workout plan
-- ============================================================

CREATE TABLE IF NOT EXISTS workout_plan_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    workout_plan_id UUID NOT NULL
        REFERENCES workout_plans(id)
        ON DELETE CASCADE,

    exercise_id UUID NOT NULL
        REFERENCES exercises(id)
        ON DELETE RESTRICT,

    day_number INTEGER NOT NULL,
    exercise_order INTEGER NOT NULL,

    sets INTEGER,
    target_reps VARCHAR(30),
    rest_seconds INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT workout_plan_exercises_day_check
        CHECK (day_number > 0),

    CONSTRAINT workout_plan_exercises_order_check
        CHECK (exercise_order > 0),

    CONSTRAINT workout_plan_exercises_sets_check
        CHECK (sets IS NULL OR sets > 0),

    CONSTRAINT workout_plan_exercises_rest_check
        CHECK (rest_seconds IS NULL OR rest_seconds >= 0),

    CONSTRAINT workout_plan_exercises_unique_order
        UNIQUE (workout_plan_id, day_number, exercise_order)
);

CREATE INDEX IF NOT EXISTS workout_plan_exercises_plan_idx
    ON workout_plan_exercises (workout_plan_id);

CREATE INDEX IF NOT EXISTS workout_plan_exercises_exercise_idx
    ON workout_plan_exercises (exercise_id);


-- ============================================================
-- 4. WORKOUT SESSIONS
-- A workout actually performed by the user
-- ============================================================

CREATE TABLE IF NOT EXISTS workout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    workout_plan_id UUID
        REFERENCES workout_plans(id)
        ON DELETE SET NULL,

    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    duration_seconds INTEGER,
    calories_burned NUMERIC(8,2),
    points_earned INTEGER NOT NULL DEFAULT 0,

    status VARCHAR(20) NOT NULL DEFAULT 'in_progress'
        CHECK (
            status IN (
                'in_progress',
                'paused',
                'completed',
                'cancelled'
            )
        ),

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT workout_sessions_duration_check
        CHECK (
            duration_seconds IS NULL
            OR duration_seconds >= 0
        ),

    CONSTRAINT workout_sessions_calories_check
        CHECK (
            calories_burned IS NULL
            OR calories_burned >= 0
        ),

    CONSTRAINT workout_sessions_points_check
        CHECK (points_earned >= 0),

    CONSTRAINT workout_sessions_time_check
        CHECK (
            completed_at IS NULL
            OR started_at IS NULL
            OR completed_at >= started_at
        )
);

CREATE INDEX IF NOT EXISTS workout_sessions_user_idx
    ON workout_sessions (user_id);

CREATE INDEX IF NOT EXISTS workout_sessions_user_status_idx
    ON workout_sessions (user_id, status);

CREATE INDEX IF NOT EXISTS workout_sessions_user_started_idx
    ON workout_sessions (user_id, started_at DESC);


-- ============================================================
-- 5. WORKOUT SESSION EXERCISES
-- Actual performance during a workout session
-- ============================================================

CREATE TABLE IF NOT EXISTS workout_session_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    session_id UUID NOT NULL
        REFERENCES workout_sessions(id)
        ON DELETE CASCADE,

    exercise_id UUID NOT NULL
        REFERENCES exercises(id)
        ON DELETE RESTRICT,

    exercise_order INTEGER NOT NULL,

    completed BOOLEAN NOT NULL DEFAULT FALSE,

    sets_completed INTEGER NOT NULL DEFAULT 0,
    reps_completed INTEGER,

    weight_used_kg NUMERIC(7,2),
    duration_seconds INTEGER,
    calories_burned NUMERIC(8,2),

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT workout_session_exercises_order_check
        CHECK (exercise_order > 0),

    CONSTRAINT workout_session_exercises_sets_check
        CHECK (sets_completed >= 0),

    CONSTRAINT workout_session_exercises_reps_check
        CHECK (
            reps_completed IS NULL
            OR reps_completed >= 0
        ),

    CONSTRAINT workout_session_exercises_weight_check
        CHECK (
            weight_used_kg IS NULL
            OR weight_used_kg >= 0
        ),

    CONSTRAINT workout_session_exercises_duration_check
        CHECK (
            duration_seconds IS NULL
            OR duration_seconds >= 0
        ),

    CONSTRAINT workout_session_exercises_calories_check
        CHECK (
            calories_burned IS NULL
            OR calories_burned >= 0
        ),

    CONSTRAINT workout_session_exercises_unique_order
        UNIQUE (session_id, exercise_order)
);

CREATE INDEX IF NOT EXISTS workout_session_exercises_session_idx
    ON workout_session_exercises (session_id);

CREATE INDEX IF NOT EXISTS workout_session_exercises_exercise_idx
    ON workout_session_exercises (exercise_id);