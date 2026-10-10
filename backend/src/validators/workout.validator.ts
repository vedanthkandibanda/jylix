import { z } from "zod";

// ============================================================
// Exercise Validation
// ============================================================

export const createExerciseSchema = z.object({
  name: z.string().trim().min(2).max(150),

  category: z.string().trim().max(50).optional(),

  primaryMuscles: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  secondaryMuscles: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  difficulty: z.string().trim().max(30).optional(),

  equipment: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  movementPattern: z.string().trim().max(50).optional(),

  exerciseType: z.string().trim().max(50).optional(),

  instructions: z.string().trim().max(10000).optional(),

  commonMistakes: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  alternatives: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  progressions: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  regressions: z
    .array(z.string().trim().min(1))
    .max(20)
    .optional(),

  videoUrl: z.string().url().max(1000).optional(),

  imageUrl: z.string().url().max(1000).optional(),
});

// ============================================================
// Workout Plan Validation
// ============================================================

export const createWorkoutPlanSchema = z.object({
  name: z.string().trim().min(2).max(150),

  goal: z.string().trim().max(50).optional(),

  difficulty: z.string().trim().max(30).optional(),

  durationWeeks: z
    .number()
    .int()
    .positive()
    .max(520)
    .optional(),

  sessionsPerWeek: z
    .number()
    .int()
    .min(1)
    .max(7)
    .optional(),

  estimatedSessionMinutes: z
    .number()
    .int()
    .positive()
    .max(600)
    .optional(),

  status: z
    .enum(["draft", "active", "completed", "archived"])
    .optional(),
});