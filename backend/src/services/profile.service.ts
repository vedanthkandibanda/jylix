import {
  findProfileByUserId,
  updateUserProfile,
  findHealthProfileByUserId,
  upsertHealthProfile,
  findUserPreferencesByUserId,
  upsertUserPreferences,
  findFitnessGoalsByUserId,
  findFitnessGoalById,
  createFitnessGoal,
  updateFitnessGoal,
  deleteFitnessGoal,
} from "../repositories/profile.repository.js";

export const getProfile = async (userId: string) => {
  const profile = await findProfileByUserId(userId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

export const updateProfile = async (
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
  const profile = await updateUserProfile(userId, data);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

export const getHealthProfile = async (
  userId: string,
) => {
  return findHealthProfileByUserId(userId);
};

export const updateHealthProfile = async (
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
  return upsertHealthProfile(userId, data);
};

export const getUserPreferences = async (
  userId: string,
) => {
  return findUserPreferencesByUserId(userId);
};

export const updateUserPreferences = async (
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
  return upsertUserPreferences(userId, data);
};

export const getFitnessGoals = async (
  userId: string,
) => {
  return findFitnessGoalsByUserId(userId);
};

export const createGoal = async (
  userId: string,
  data: {
    goalType: string;
    targetWeightKg?: number | null;
    targetDate?: string | null;
    priority?: number;
  },
) => {
  return createFitnessGoal(userId, data);
};

export const updateGoal = async (
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
  const existingGoal = await findFitnessGoalById(
    userId,
    goalId,
  );

  if (!existingGoal) {
    throw new Error("Goal not found");
  }

  return updateFitnessGoal(
    userId,
    goalId,
    data,
  );
};

export const deleteGoal = async (
  userId: string,
  goalId: string,
) => {
  const existingGoal = await findFitnessGoalById(
    userId,
    goalId,
  );

  if (!existingGoal) {
    throw new Error("Goal not found");
  }

  await deleteFitnessGoal(userId, goalId);
};
