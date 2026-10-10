import { z } from "zod";

const nullableString = z
  .string()
  .trim()
  .max(255)
  .nullable()
  .optional();

const stringArray = z
  .array(
    z
      .string()
      .trim()
      .min(1)
      .max(100),
  )
  .optional();

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .optional(),

  phone: nullableString,

  dateOfBirth: z
    .string()
    .date("Invalid date of birth")
    .nullable()
    .optional(),

  gender: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  profilePhotoUrl: nullableString,

  country: nullableString,

  state: nullableString,

  city: nullableString,

  preferredLanguage: z
    .string()
    .trim()
    .min(2)
    .max(20)
    .optional(),
});

export const updateHealthProfileSchema = z.object({
  heightCm: z
    .number()
    .positive()
    .max(300)
    .nullable()
    .optional(),

  weightKg: z
    .number()
    .positive()
    .max(500)
    .nullable()
    .optional(),

  bodyFatPercent: z
    .number()
    .min(0)
    .max(100)
    .nullable()
    .optional(),

  activityLevel: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  experienceLevel: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  healthConditions: stringArray,

  injuries: stringArray,

  allergies: stringArray,

  sleepHours: z
    .number()
    .min(0)
    .max(24)
    .nullable()
    .optional(),

  stressLevel: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  waterIntakeMl: z
    .number()
    .int()
    .min(0)
    .max(20000)
    .nullable()
    .optional(),
});

export const updatePreferencesSchema = z.object({
  dietType: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  favoriteFoods: stringArray,

  foodsToAvoid: stringArray,

  monthlyFoodBudget: z
    .number()
    .min(0)
    .nullable()
    .optional(),

  preferredWorkoutLocation: z
    .string()
    .trim()
    .max(30)
    .nullable()
    .optional(),

  availableEquipment: stringArray,

  workoutDaysPerWeek: z
    .number()
    .int()
    .min(1)
    .max(7)
    .nullable()
    .optional(),

  sessionDurationMinutes: z
    .number()
    .int()
    .min(10)
    .max(300)
    .nullable()
    .optional(),

  preferredWorkoutTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Invalid workout time",
    )
    .nullable()
    .optional(),

  unitSystem: z
    .enum(["metric", "imperial"])
    .nullable()
    .optional(),
});

export const createGoalSchema = z.object({
  goalType: z
    .string()
    .trim()
    .min(2)
    .max(50),

  targetWeightKg: z
    .number()
    .positive()
    .max(500)
    .nullable()
    .optional(),

  targetDate: z
    .string()
    .date("Invalid target date")
    .nullable()
    .optional(),

  priority: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),
});

export const updateGoalSchema = z.object({
  goalType: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  targetWeightKg: z
    .number()
    .positive()
    .max(500)
    .nullable()
    .optional(),

  targetDate: z
    .string()
    .date("Invalid target date")
    .nullable()
    .optional(),

  priority: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),

  status: z
    .enum(["active", "completed", "paused", "cancelled"])
    .optional(),
});

export type UpdateProfileInput = z.infer<
  typeof updateProfileSchema
>;

export type UpdateHealthProfileInput = z.infer<
  typeof updateHealthProfileSchema
>;

export type UpdatePreferencesInput = z.infer<
  typeof updatePreferencesSchema
>;

export type CreateGoalInput = z.infer<
  typeof createGoalSchema
>;

export type UpdateGoalInput = z.infer<
  typeof updateGoalSchema
>;
