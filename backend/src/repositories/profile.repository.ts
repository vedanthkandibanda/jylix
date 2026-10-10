import { db } from "../config/db.js";

export const findProfileByUserId = async (
  userId: string,
) => {
  const result = await db.query(
    `
      SELECT
        u.id,
        u.name,
        u.email,
        u.phone,
        u.date_of_birth AS "dateOfBirth",
        u.gender,
        u.profile_photo_url AS "profilePhotoUrl",
        u.country,
        u.state,
        u.city,
        u.preferred_language AS "preferredLanguage",
        u.email_verified_at AS "emailVerifiedAt",
        u.created_at AS "createdAt",
        u.updated_at AS "updatedAt",

        hp.height_cm AS "heightCm",
        hp.weight_kg AS "weightKg",
        hp.body_fat_percent AS "bodyFatPercent",
        hp.activity_level AS "activityLevel",
        hp.experience_level AS "experienceLevel",
        hp.health_conditions AS "healthConditions",
        hp.injuries,
        hp.allergies,
        hp.sleep_hours AS "sleepHours",
        hp.stress_level AS "stressLevel",
        hp.water_intake_ml AS "waterIntakeMl",

        up.diet_type AS "dietType",
        up.favorite_foods AS "favoriteFoods",
        up.foods_to_avoid AS "foodsToAvoid",
        up.monthly_food_budget AS "monthlyFoodBudget",
        up.preferred_workout_location AS "preferredWorkoutLocation",
        up.available_equipment AS "availableEquipment",
        up.workout_days_per_week AS "workoutDaysPerWeek",
        up.session_duration_minutes AS "sessionDurationMinutes",
        up.preferred_workout_time AS "preferredWorkoutTime",
        up.unit_system AS "unitSystem"

      FROM users u

      LEFT JOIN health_profiles hp
        ON hp.user_id = u.id

      LEFT JOIN user_preferences up
        ON up.user_id = u.id

      WHERE u.id = $1
        AND u.account_status = 'active'

      LIMIT 1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const updateUserProfile = async (
  userId: string,
  data: {
    name?: string;
    phone?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    profilePhotoUrl?: string | null;
    country?: string | null;
    state?: string | null;
    city?: string | null;
    preferredLanguage?: string;
  },
) => {
  const result = await db.query(
    `
      UPDATE users
      SET
        name = COALESCE($2, name),
        phone = COALESCE($3, phone),
        date_of_birth = COALESCE($4, date_of_birth),
        gender = COALESCE($5, gender),
        profile_photo_url = COALESCE($6, profile_photo_url),
        country = COALESCE($7, country),
        state = COALESCE($8, state),
        city = COALESCE($9, city),
        preferred_language = COALESCE(
          $10,
          preferred_language
        ),
        updated_at = NOW()

      WHERE id = $1
        AND account_status = 'active'

      RETURNING
        id,
        name,
        email,
        phone,
        date_of_birth AS "dateOfBirth",
        gender,
        profile_photo_url AS "profilePhotoUrl",
        country,
        state,
        city,
        preferred_language AS "preferredLanguage",
        email_verified_at AS "emailVerifiedAt",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      userId,
      data.name,
      data.phone,
      data.dateOfBirth,
      data.gender,
      data.profilePhotoUrl,
      data.country,
      data.state,
      data.city,
      data.preferredLanguage,
    ],
  );

  return result.rows[0] ?? null;
};
export const findHealthProfileByUserId = async (
  userId: string,
) => {
  const result = await db.query(
    `
      SELECT
        id,
        user_id AS "userId",
        height_cm AS "heightCm",
        weight_kg AS "weightKg",
        body_fat_percent AS "bodyFatPercent",
        activity_level AS "activityLevel",
        experience_level AS "experienceLevel",
        health_conditions AS "healthConditions",
        injuries,
        allergies,
        sleep_hours AS "sleepHours",
        stress_level AS "stressLevel",
        water_intake_ml AS "waterIntakeMl",
        updated_at AS "updatedAt"
      FROM health_profiles
      WHERE user_id = $1
      LIMIT 1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const upsertHealthProfile = async (
  userId: string,
  data: {
    heightCm?: number | null;
    weightKg?: number | null;
    bodyFatPercent?: number | null;
    activityLevel?: string | null;
    experienceLevel?: string | null;
    healthConditions?: string[];
    injuries?: string[];
    allergies?: string[];
    sleepHours?: number | null;
    stressLevel?: string | null;
    waterIntakeMl?: number | null;
  },
) => {
  const result = await db.query(
    `
      INSERT INTO health_profiles (
        user_id,
        height_cm,
        weight_kg,
        body_fat_percent,
        activity_level,
        experience_level,
        health_conditions,
        injuries,
        allergies,
        sleep_hours,
        stress_level,
        water_intake_ml
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7::jsonb,
        $8::jsonb,
        $9::jsonb,
        $10,
        $11,
        $12
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        height_cm = COALESCE(
          EXCLUDED.height_cm,
          health_profiles.height_cm
        ),
        weight_kg = COALESCE(
          EXCLUDED.weight_kg,
          health_profiles.weight_kg
        ),
        body_fat_percent = COALESCE(
          EXCLUDED.body_fat_percent,
          health_profiles.body_fat_percent
        ),
        activity_level = COALESCE(
          EXCLUDED.activity_level,
          health_profiles.activity_level
        ),
        experience_level = COALESCE(
          EXCLUDED.experience_level,
          health_profiles.experience_level
        ),
        health_conditions = COALESCE(
          EXCLUDED.health_conditions,
          health_profiles.health_conditions
        ),
        injuries = COALESCE(
          EXCLUDED.injuries,
          health_profiles.injuries
        ),
        allergies = COALESCE(
          EXCLUDED.allergies,
          health_profiles.allergies
        ),
        sleep_hours = COALESCE(
          EXCLUDED.sleep_hours,
          health_profiles.sleep_hours
        ),
        stress_level = COALESCE(
          EXCLUDED.stress_level,
          health_profiles.stress_level
        ),
        water_intake_ml = COALESCE(
          EXCLUDED.water_intake_ml,
          health_profiles.water_intake_ml
        ),
        updated_at = NOW()

      RETURNING
        id,
        user_id AS "userId",
        height_cm AS "heightCm",
        weight_kg AS "weightKg",
        body_fat_percent AS "bodyFatPercent",
        activity_level AS "activityLevel",
        experience_level AS "experienceLevel",
        health_conditions AS "healthConditions",
        injuries,
        allergies,
        sleep_hours AS "sleepHours",
        stress_level AS "stressLevel",
        water_intake_ml AS "waterIntakeMl",
        updated_at AS "updatedAt"
    `,
    [
      userId,
      data.heightCm,
      data.weightKg,
      data.bodyFatPercent,
      data.activityLevel,
      data.experienceLevel,
      JSON.stringify(data.healthConditions ?? []),
      JSON.stringify(data.injuries ?? []),
      JSON.stringify(data.allergies ?? []),
      data.sleepHours,
      data.stressLevel,
      data.waterIntakeMl,
    ],
  );

  return result.rows[0];
};
export const findUserPreferencesByUserId = async (
  userId: string,
) => {
  const result = await db.query(
    `
      SELECT
        id,
        user_id AS "userId",
        diet_type AS "dietType",
        favorite_foods AS "favoriteFoods",
        foods_to_avoid AS "foodsToAvoid",
        monthly_food_budget AS "monthlyFoodBudget",
        preferred_workout_location AS "preferredWorkoutLocation",
        available_equipment AS "availableEquipment",
        workout_days_per_week AS "workoutDaysPerWeek",
        session_duration_minutes AS "sessionDurationMinutes",
        preferred_workout_time AS "preferredWorkoutTime",
        unit_system AS "unitSystem",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM user_preferences
      WHERE user_id = $1
      LIMIT 1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const upsertUserPreferences = async (
  userId: string,
  data: {
    dietType?: string | null;
    favoriteFoods?: string[];
    foodsToAvoid?: string[];
    monthlyFoodBudget?: number | null;
    preferredWorkoutLocation?: string | null;
    availableEquipment?: string[];
    workoutDaysPerWeek?: number | null;
    sessionDurationMinutes?: number | null;
    preferredWorkoutTime?: string | null;
    unitSystem?: string | null;
  },
) => {
  const result = await db.query(
    `
      INSERT INTO user_preferences (
        user_id,
        diet_type,
        favorite_foods,
        foods_to_avoid,
        monthly_food_budget,
        preferred_workout_location,
        available_equipment,
        workout_days_per_week,
        session_duration_minutes,
        preferred_workout_time,
        unit_system
      )
      VALUES (
        $1,
        $2,
        $3::jsonb,
        $4::jsonb,
        $5,
        $6,
        $7::jsonb,
        $8,
        $9,
        $10,
        $11
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        diet_type = COALESCE(
          EXCLUDED.diet_type,
          user_preferences.diet_type
        ),
        favorite_foods = COALESCE(
          EXCLUDED.favorite_foods,
          user_preferences.favorite_foods
        ),
        foods_to_avoid = COALESCE(
          EXCLUDED.foods_to_avoid,
          user_preferences.foods_to_avoid
        ),
        monthly_food_budget = COALESCE(
          EXCLUDED.monthly_food_budget,
          user_preferences.monthly_food_budget
        ),
        preferred_workout_location = COALESCE(
          EXCLUDED.preferred_workout_location,
          user_preferences.preferred_workout_location
        ),
        available_equipment = COALESCE(
          EXCLUDED.available_equipment,
          user_preferences.available_equipment
        ),
        workout_days_per_week = COALESCE(
          EXCLUDED.workout_days_per_week,
          user_preferences.workout_days_per_week
        ),
        session_duration_minutes = COALESCE(
          EXCLUDED.session_duration_minutes,
          user_preferences.session_duration_minutes
        ),
        preferred_workout_time = COALESCE(
          EXCLUDED.preferred_workout_time,
          user_preferences.preferred_workout_time
        ),
        unit_system = COALESCE(
          EXCLUDED.unit_system,
          user_preferences.unit_system
        ),
        updated_at = NOW()

      RETURNING
        id,
        user_id AS "userId",
        diet_type AS "dietType",
        favorite_foods AS "favoriteFoods",
        foods_to_avoid AS "foodsToAvoid",
        monthly_food_budget AS "monthlyFoodBudget",
        preferred_workout_location AS "preferredWorkoutLocation",
        available_equipment AS "availableEquipment",
        workout_days_per_week AS "workoutDaysPerWeek",
        session_duration_minutes AS "sessionDurationMinutes",
        preferred_workout_time AS "preferredWorkoutTime",
        unit_system AS "unitSystem",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      userId,
      data.dietType,
      JSON.stringify(data.favoriteFoods ?? []),
      JSON.stringify(data.foodsToAvoid ?? []),
      data.monthlyFoodBudget,
      data.preferredWorkoutLocation,
      JSON.stringify(data.availableEquipment ?? []),
      data.workoutDaysPerWeek,
      data.sessionDurationMinutes,
      data.preferredWorkoutTime,
      data.unitSystem,
    ],
  );

  return result.rows[0];
};

export const findFitnessGoalsByUserId = async (
  userId: string,
) => {
  const result = await db.query(
    `
      SELECT
        id,
        user_id AS "userId",
        goal_type AS "goalType",
        target_weight_kg AS "targetWeightKg",
        target_date AS "targetDate",
        priority,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM fitness_goals
      WHERE user_id = $1
      ORDER BY
        CASE
          WHEN status = 'active' THEN 0
          ELSE 1
        END,
        priority ASC,
        created_at DESC
    `,
    [userId],
  );

  return result.rows;
};

export const findFitnessGoalById = async (
  userId: string,
  goalId: string,
) => {
  const result = await db.query(
    `
      SELECT
        id,
        user_id AS "userId",
        goal_type AS "goalType",
        target_weight_kg AS "targetWeightKg",
        target_date AS "targetDate",
        priority,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM fitness_goals
      WHERE id = $1
        AND user_id = $2
      LIMIT 1
    `,
    [goalId, userId],
  );

  return result.rows[0] ?? null;
};

export const createFitnessGoal = async (
  userId: string,
  data: {
    goalType: string;
    targetWeightKg?: number | null;
    targetDate?: string | null;
    priority?: number;
  },
) => {
  const result = await db.query(
    `
      INSERT INTO fitness_goals (
        user_id,
        goal_type,
        target_weight_kg,
        target_date,
        priority,
        status
      )
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING
        id,
        user_id AS "userId",
        goal_type AS "goalType",
        target_weight_kg AS "targetWeightKg",
        target_date AS "targetDate",
        priority,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      userId,
      data.goalType,
      data.targetWeightKg,
      data.targetDate,
      data.priority ?? 1,
    ],
  );

  return result.rows[0];
};

export const updateFitnessGoal = async (
  userId: string,
  goalId: string,
  data: {
    goalType?: string;
    targetWeightKg?: number | null;
    targetDate?: string | null;
    priority?: number;
    status?: string;
  },
) => {
  const result = await db.query(
    `
      UPDATE fitness_goals
      SET
        goal_type = COALESCE($3, goal_type),
        target_weight_kg = COALESCE(
          $4,
          target_weight_kg
        ),
        target_date = COALESCE(
          $5,
          target_date
        ),
        priority = COALESCE($6, priority),
        status = COALESCE($7, status),
        updated_at = NOW()
      WHERE id = $1
        AND user_id = $2
      RETURNING
        id,
        user_id AS "userId",
        goal_type AS "goalType",
        target_weight_kg AS "targetWeightKg",
        target_date AS "targetDate",
        priority,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      goalId,
      userId,
      data.goalType,
      data.targetWeightKg,
      data.targetDate,
      data.priority,
      data.status,
    ],
  );

  return result.rows[0] ?? null;
};

export const deleteFitnessGoal = async (
  userId: string,
  goalId: string,
): Promise<boolean> => {
  const result = await db.query(
    `
      DELETE FROM fitness_goals
      WHERE id = $1
        AND user_id = $2
    `,
    [goalId, userId],
  );

  return (result.rowCount ?? 0) > 0;
};
