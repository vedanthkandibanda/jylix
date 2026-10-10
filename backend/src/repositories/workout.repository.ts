import { query } from "../config/db.js";

// ============================================================
// Exercise Library
// ============================================================

export const findExercises = async () => {
  const result = await query(
    `
      SELECT
        id,
        name,
        category,
        primary_muscles,
        secondary_muscles,
        difficulty,
        equipment,
        movement_pattern,
        exercise_type,
        instructions,
        common_mistakes,
        alternatives,
        progressions,
        regressions,
        video_url,
        image_url,
        created_at,
        updated_at
      FROM exercises
      ORDER BY name ASC
    `,
  );

  return result.rows;
};

export const findExerciseById = async (exerciseId: string) => {
  const result = await query(
    `
      SELECT
        id,
        name,
        category,
        primary_muscles,
        secondary_muscles,
        difficulty,
        equipment,
        movement_pattern,
        exercise_type,
        instructions,
        common_mistakes,
        alternatives,
        progressions,
        regressions,
        video_url,
        image_url,
        created_at,
        updated_at
      FROM exercises
      WHERE id = $1
    `,
    [exerciseId],
  );

  return result.rows[0] ?? null;
};

export const createExercise = async (data: {
  name: string;
  category?: string;
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  difficulty?: string;
  equipment?: string[];
  movementPattern?: string;
  exerciseType?: string;
  instructions?: string;
  commonMistakes?: string[];
  alternatives?: string[];
  progressions?: string[];
  regressions?: string[];
  videoUrl?: string;
  imageUrl?: string;
}) => {
  const result = await query(
    `
      INSERT INTO exercises (
        name,
        category,
        primary_muscles,
        secondary_muscles,
        difficulty,
        equipment,
        movement_pattern,
        exercise_type,
        instructions,
        common_mistakes,
        alternatives,
        progressions,
        regressions,
        video_url,
        image_url
      )
      VALUES (
        $1,
        $2,
        $3::jsonb,
        $4::jsonb,
        $5,
        $6::jsonb,
        $7,
        $8,
        $9,
        $10::jsonb,
        $11::jsonb,
        $12::jsonb,
        $13::jsonb,
        $14,
        $15
      )
      RETURNING *
    `,
    [
      data.name,
      data.category ?? null,
      JSON.stringify(data.primaryMuscles ?? []),
      JSON.stringify(data.secondaryMuscles ?? []),
      data.difficulty ?? null,
      JSON.stringify(data.equipment ?? []),
      data.movementPattern ?? null,
      data.exerciseType ?? null,
      data.instructions ?? null,
      JSON.stringify(data.commonMistakes ?? []),
      JSON.stringify(data.alternatives ?? []),
      JSON.stringify(data.progressions ?? []),
      JSON.stringify(data.regressions ?? []),
      data.videoUrl ?? null,
      data.imageUrl ?? null,
    ],
  );

  return result.rows[0];
};

// ============================================================
// Workout Plans
// ============================================================

export const findWorkoutPlansByUserId = async (userId: string) => {
  const result = await query(
    `
      SELECT
        id,
        user_id,
        name,
        goal,
        difficulty,
        duration_weeks,
        sessions_per_week,
        estimated_session_minutes,
        status,
        created_at,
        updated_at
      FROM workout_plans
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows;
};

export const findWorkoutPlanById = async (
  userId: string,
  planId: string,
) => {
  const result = await query(
    `
      SELECT
        id,
        user_id,
        name,
        goal,
        difficulty,
        duration_weeks,
        sessions_per_week,
        estimated_session_minutes,
        status,
        created_at,
        updated_at
      FROM workout_plans
      WHERE id = $1
        AND user_id = $2
    `,
    [planId, userId],
  );

  return result.rows[0] ?? null;
};

export const createWorkoutPlan = async (
  userId: string,
  data: {
    name: string;
    goal?: string;
    difficulty?: string;
    durationWeeks?: number;
    sessionsPerWeek?: number;
    estimatedSessionMinutes?: number;
    status?: string;
  },
) => {
  const result = await query(
    `
      INSERT INTO workout_plans (
        user_id,
        name,
        goal,
        difficulty,
        duration_weeks,
        sessions_per_week,
        estimated_session_minutes,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
    [
      userId,
      data.name,
      data.goal ?? null,
      data.difficulty ?? null,
      data.durationWeeks ?? null,
      data.sessionsPerWeek ?? null,
      data.estimatedSessionMinutes ?? null,
      data.status ?? "active",
    ],
  );

  return result.rows[0];
};

export const findWorkoutPlanExercises = async (
  userId: string,
  workoutPlanId: string,
) => {
  const result = await query(
    `
      SELECT
        wpe.id,
        wpe.workout_plan_id,
        wpe.exercise_id,
        wpe.day_number,
        wpe.exercise_order,
        wpe.sets,
        wpe.target_reps,
        wpe.rest_seconds,

        e.name,
        e.category,
        e.primary_muscles,
        e.secondary_muscles,
        e.difficulty,
        e.equipment,
        e.instructions,
        e.video_url,
        e.image_url

      FROM workout_plan_exercises wpe

      INNER JOIN workout_plans wp
        ON wp.id = wpe.workout_plan_id

      INNER JOIN exercises e
        ON e.id = wpe.exercise_id

      WHERE wpe.workout_plan_id = $1
        AND wp.user_id = $2

      ORDER BY
        wpe.day_number ASC,
        wpe.exercise_order ASC
    `,
    [workoutPlanId, userId],
  );

  return result.rows;
};

export const addExerciseToWorkoutPlan = async (
  userId: string,
  data: {
    workoutPlanId: string;
    exerciseId: string;
    dayNumber: number;
    exerciseOrder: number;
    sets?: number;
    targetReps?: string;
    restSeconds?: number;
  },
) => {
  const result = await query(
    `
      INSERT INTO workout_plan_exercises (
        workout_plan_id,
        exercise_id,
        day_number,
        exercise_order,
        sets,
        target_reps,
        rest_seconds
      )
      SELECT
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      WHERE EXISTS (
        SELECT 1
        FROM workout_plans
        WHERE id = $1
          AND user_id = $8
      )
      RETURNING *
    `,
    [
      data.workoutPlanId,
      data.exerciseId,
      data.dayNumber,
      data.exerciseOrder,
      data.sets ?? null,
      data.targetReps ?? null,
      data.restSeconds ?? null,
      userId,
    ],
  );

  if (!result.rows[0]) {
    throw new Error("Workout plan not found");
  }

  return result.rows[0];
};

export const createWorkoutSession = async (
  userId: string,
  data: {
    workoutPlanId?: string;
    startedAt?: string;
  },
) => {
  const result = await query(
    `
      INSERT INTO workout_sessions (
        user_id,
        workout_plan_id,
        started_at
      )
      VALUES (
        $1,
        $2::uuid,
        COALESCE($3::timestamptz, NOW())
      )
      RETURNING *
    `,
    [
      userId,
      data.workoutPlanId ?? null,
      data.startedAt ?? null,
    ],
  );

  return result.rows[0];
};

export const findWorkoutSessionsByUserId = async (
  userId: string,
) => {
  const result = await query(
    `
      SELECT
        ws.*,
        wp.name AS workout_plan_name
      FROM workout_sessions ws
      LEFT JOIN workout_plans wp
        ON wp.id = ws.workout_plan_id
      WHERE ws.user_id = $1
      ORDER BY ws.started_at DESC NULLS LAST, ws.created_at DESC
    `,
    [userId],
  );

  return result.rows;
};

export const findWorkoutSessionById = async (
  userId: string,
  sessionId: string,
) => {
  const result = await query(
    `
      SELECT
        ws.*,
        wp.name AS workout_plan_name
      FROM workout_sessions ws
      LEFT JOIN workout_plans wp
        ON wp.id = ws.workout_plan_id
      WHERE ws.id = $1
        AND ws.user_id = $2
    `,
    [sessionId, userId],
  );

  return result.rows[0] ?? null;
};

export const updateWorkoutSession = async (
  userId: string,
  sessionId: string,
  data: {
    completedAt?: string;
    durationSeconds?: number;
    caloriesBurned?: number;
    pointsEarned?: number;
    status?: string;
    notes?: string;
  },
) => {
  const result = await query(
    `
      UPDATE workout_sessions
      SET
        completed_at = COALESCE($3, completed_at),
        duration_seconds = COALESCE($4, duration_seconds),
        calories_burned = COALESCE($5, calories_burned),
        points_earned = COALESCE($6, points_earned),
        status = COALESCE($7, status),
        notes = COALESCE($8, notes),
        updated_at = NOW()
      WHERE id = $1
        AND user_id = $2
      RETURNING *
    `,
    [
      sessionId,
      userId,
      data.completedAt ?? null,
      data.durationSeconds ?? null,
      data.caloriesBurned ?? null,
      data.pointsEarned ?? null,
      data.status ?? null,
      data.notes ?? null,
    ],
  );

  return result.rows[0] ?? null;
};

export const addExerciseToWorkoutSession = async (
  userId: string,
  data: {
    sessionId: string;
    exerciseId: string;
    exerciseOrder: number;
  },
) => {
  const result = await query(
    `
      INSERT INTO workout_session_exercises (
        session_id,
        exercise_id,
        exercise_order
      )
      SELECT
        $1,
        $2,
        $3
      WHERE EXISTS (
        SELECT 1
        FROM workout_sessions
        WHERE id = $1
          AND user_id = $4
      )
      RETURNING *
    `,
    [
      data.sessionId,
      data.exerciseId,
      data.exerciseOrder,
      userId,
    ],
  );

  if (!result.rows[0]) {
    throw new Error("Workout session not found");
  }

  return result.rows[0];
};

export const findWorkoutSessionExercises = async (
  userId: string,
  sessionId: string,
) => {
  const result = await query(
    `
      SELECT
        wse.id,
        wse.session_id,
        wse.exercise_id,
        wse.exercise_order,
        wse.completed,
        wse.sets_completed,
        wse.reps_completed,
        wse.weight_used_kg,
        wse.duration_seconds,
        wse.calories_burned,
        wse.notes,

        e.name,
        e.category,
        e.primary_muscles,
        e.secondary_muscles,
        e.difficulty,
        e.equipment,
        e.instructions,
        e.video_url,
        e.image_url

      FROM workout_session_exercises wse

      INNER JOIN workout_sessions ws
        ON ws.id = wse.session_id

      INNER JOIN exercises e
        ON e.id = wse.exercise_id

      WHERE wse.session_id = $1
        AND ws.user_id = $2

      ORDER BY wse.exercise_order ASC
    `,
    [sessionId, userId],
  );

  return result.rows;
};

export const updateWorkoutSessionExercise = async (
  userId: string,
  sessionExerciseId: string,
  data: {
    completed?: boolean;
    setsCompleted?: number;
    repsCompleted?: number;
    weightUsedKg?: number;
    durationSeconds?: number;
    caloriesBurned?: number;
    notes?: string;
  },
) => {
  const result = await query(
    `
      UPDATE workout_session_exercises wse
      SET
        completed = COALESCE($3, completed),
        sets_completed = COALESCE($4, sets_completed),
        reps_completed = COALESCE($5, reps_completed),
        weight_used_kg = COALESCE($6, weight_used_kg),
        duration_seconds = COALESCE($7, duration_seconds),
        calories_burned = COALESCE($8, calories_burned),
        notes = COALESCE($9, notes),
        updated_at = NOW()
      FROM workout_sessions ws
      WHERE wse.id = $1
        AND wse.session_id = ws.id
        AND ws.user_id = $2
      RETURNING wse.*
    `,
    [
      sessionExerciseId,
      userId,
      data.completed ?? null,
      data.setsCompleted ?? null,
      data.repsCompleted ?? null,
      data.weightUsedKg ?? null,
      data.durationSeconds ?? null,
      data.caloriesBurned ?? null,
      data.notes ?? null,
    ],
  );

  return result.rows[0] ?? null;
};