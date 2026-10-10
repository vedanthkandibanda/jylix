import {
  addExerciseToWorkoutPlan,
  addExerciseToWorkoutSession,
  createExercise,
  createWorkoutPlan,
  createWorkoutSession as createWorkoutSessionRepository,
  findExerciseById,
  findExercises,
  findWorkoutPlanById,
  findWorkoutPlanExercises,
  findWorkoutPlansByUserId,
  findWorkoutSessionById,
  findWorkoutSessionExercises,
  findWorkoutSessionsByUserId,
  updateWorkoutSession as updateWorkoutSessionRepository,
  updateWorkoutSessionExercise,
} from "../repositories/workout.repository.js";

// ============================================================
// Exercise Library
// ============================================================

export const getExercises = async () => {
  return findExercises();
};

export const getExercise = async (exerciseId: string) => {
  const exercise = await findExerciseById(exerciseId);

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  return exercise;
};

export const addExercise = async (data: {
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
  return createExercise(data);
};

// ============================================================
// Workout Plans
// ============================================================

export const getWorkoutPlans = async (userId: string) => {
  return findWorkoutPlansByUserId(userId);
};

export const getWorkoutPlan = async (
  userId: string,
  planId: string,
) => {
  const plan = await findWorkoutPlanById(userId, planId);

  if (!plan) {
    throw new Error("Workout plan not found");
  }

  return plan;
};

export const addWorkoutPlan = async (
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
  return createWorkoutPlan(userId, data);
};

export const getWorkoutPlanExercises = async (
  userId: string,
  workoutPlanId: string,
) => {
  // Verify that the plan belongs to the authenticated user
  await getWorkoutPlan(userId, workoutPlanId);

  return findWorkoutPlanExercises(userId, workoutPlanId);
};

export const addExerciseToPlan = async (
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
  // Verify plan ownership first
  await getWorkoutPlan(userId, data.workoutPlanId);

  // Verify that the exercise exists
  const exercise = await findExerciseById(data.exerciseId);

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  return addExerciseToWorkoutPlan(userId, data);
};

export const addExerciseToSession = async (
  userId: string,
  data: {
    sessionId: string;
    exerciseId: string;
    exerciseOrder: number;
  },
) => {
  const session = await findWorkoutSessionById(
    userId,
    data.sessionId,
  );

  if (!session) {
    throw new Error("Workout session not found");
  }

  const exercise = await findExerciseById(data.exerciseId);

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  return addExerciseToWorkoutSession(userId, data);
};

export const getWorkoutSessionExercises = async (
  userId: string,
  sessionId: string,
) => {
  const session = await findWorkoutSessionById(
    userId,
    sessionId,
  );

  if (!session) {
    throw new Error("Workout session not found");
  }

  return findWorkoutSessionExercises(
    userId,
    sessionId,
  );
};

export const updateSessionExercise = async (
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
  const updated = await updateWorkoutSessionExercise(
    userId,
    sessionExerciseId,
    data,
  );

  if (!updated) {
    throw new Error("Workout session exercise not found");
  }

  return updated;
};

export const getWorkoutSessions = async (userId: string) => {
  return findWorkoutSessionsByUserId(userId);
};

export const getWorkoutSession = async (
  userId: string,
  sessionId: string,
) => {
  const session = await findWorkoutSessionById(
    userId,
    sessionId,
  );

  if (!session) {
    throw new Error("Workout session not found");
  }

  return session;
};

export const createWorkoutSession = async (
  userId: string,
  data: {
    workoutPlanId?: string;
    startedAt?: string;
  },
) => {
  if (data.workoutPlanId) {
    const plan = await findWorkoutPlanById(
      userId,
      data.workoutPlanId,
    );

    if (!plan) {
      throw new Error("Workout plan not found");
    }
  }

  return createWorkoutSessionRepository(userId, data);
};

export const updateWorkoutSession = async (
  userId: string,
  sessionId: string,
  data: {
    startedAt?: string;
    completedAt?: string;
    durationSeconds?: number;
    caloriesBurned?: number;
    pointsEarned?: number;
    status?: "in_progress" | "paused" | "completed" | "cancelled";
    notes?: string;
  },
) => {
  const session = await findWorkoutSessionById(
    userId,
    sessionId,
  );

  if (!session) {
    throw new Error("Workout session not found");
  }

  const updated = await updateWorkoutSessionRepository(
    userId,
    sessionId,
    data,
  );

  if (!updated) {
    throw new Error("Workout session not found");
  }

  return updated;
};