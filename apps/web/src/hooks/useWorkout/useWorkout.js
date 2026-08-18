import { useState } from "react";

const TOTAL_EXERCISES = 6;
const STORAGE_KEY = "jylix-workout-history";

const getDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getHistory = () => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
};

const getTodayWorkout = () => {
  const history = getHistory();
  const today = getDateKey();

  return (
    history[today] || {
      date: today,
      completedExercises: [],
      completed: false,
      duration: 0,
      calories: 0,
    }
  );
};

const calculateCurrentStreak = (history) => {
  let streak = 0;

  const date = new Date();

  while (true) {
    const dateKey = getDateKey(date);
    const workout = history[dateKey];

    if (!workout?.completed) {
      break;
    }

    streak++;

    date.setDate(date.getDate() - 1);
  }

  return streak;
};

const getMonthlyStats = (history) => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  let completed = 0;

  Object.values(history).forEach((workout) => {
    if (!workout.completed) return;

    const [workoutYear, workoutMonth] =
      workout.date.split("-").map(Number);

    if (
      workoutYear === year &&
      workoutMonth === month + 1
    ) {
      completed++;
    }
  });

  const today = now.getDate();

  const consistency = Math.round(
    (completed / today) * 100
  );

  return {
    completed,
    daysInMonth,
    consistency: Math.min(consistency, 100),
  };
};

const getWeeklyHistory = (history) => {
  const today = new Date();

  const dayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const week = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const dateKey = getDateKey(date);
    const storedWorkout = history[dateKey];

    week.push({
      date: dateKey,
      day: dayNames[date.getDay()],
      completed: storedWorkout?.completed || false,
      duration: storedWorkout?.duration || 0,
      calories: storedWorkout?.calories || 0,
      isToday: i === 0,
    });
  }

  return week;
};

const useWorkout = () => {
  const [workout, setWorkout] = useState(
    getTodayWorkout
  );

  const history = getHistory();

  const saveWorkout = (updatedWorkout) => {
    const currentHistory = getHistory();

    currentHistory[updatedWorkout.date] =
      updatedWorkout;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(currentHistory)
    );

    setWorkout(updatedWorkout);
  };

  const completeExercise = (exerciseNumber) => {
    if (
      workout.completedExercises.includes(
        exerciseNumber
      )
    ) {
      return;
    }

    const completedExercises = [
      ...workout.completedExercises,
      exerciseNumber,
    ].sort((a, b) => a - b);

    const completed =
      completedExercises.length === TOTAL_EXERCISES;

    const updatedWorkout = {
      ...workout,
      completedExercises,
      completed,
      duration: completed ? 45 : workout.duration,
      calories: completed ? 320 : workout.calories,
    };

    saveWorkout(updatedWorkout);
  };

  const isCompleted = (exerciseNumber) =>
    workout.completedExercises.includes(
      exerciseNumber
    );

  const completedCount =
    workout.completedExercises.length;

  const progress = Math.round(
    (completedCount / TOTAL_EXERCISES) * 100
  );

  const workoutComplete =
    completedCount === TOTAL_EXERCISES;

  const weeklyHistory =
    getWeeklyHistory(history);

  const currentStreak =
    calculateCurrentStreak(history);

  const monthlyStats =
    getMonthlyStats(history);

  return {
    completedExercises:
      workout.completedExercises,

    completedCount,

    progress,

    workoutComplete,

    completeExercise,

    isCompleted,

    totalExercises: TOTAL_EXERCISES,

    weeklyHistory,

    currentStreak,

    monthlyStats,
  };
};

export default useWorkout;