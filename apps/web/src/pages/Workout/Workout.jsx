import {
  WorkoutCard,
  WorkoutStats,
  WorkoutProgress,
  WorkoutDifficulty,
} from "@/components/feature/workout";

import {
  BaseCard,
  Button,
  Badge,
  LinearProgress,
} from "@/components";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useWorkout } from "@/hooks";

import { WeeklyWorkout } from "@/components";

import styles from "./Workout.module.css";

const exercises = [
  {
    id: 1,
    name: "Push Ups",
    muscle: "Chest",
    sets: "3 sets",
    reps: "12 reps",
    duration: "8 min",
  },
  {
    id: 2,
    name: "Dumbbell Shoulder Press",
    muscle: "Shoulders",
    sets: "3 sets",
    reps: "10 reps",
    duration: "8 min",
  },
  {
    id: 3,
    name: "Bicep Curls",
    muscle: "Biceps",
    sets: "3 sets",
    reps: "12 reps",
    duration: "7 min",
  },
  {
    id: 4,
    name: "Tricep Dips",
    muscle: "Triceps",
    sets: "3 sets",
    reps: "10 reps",
    duration: "7 min",
  },
  {
    id: 5,
    name: "Plank",
    muscle: "Core",
    sets: "3 sets",
    reps: "45 sec",
    duration: "5 min",
  },
  {
    id: 6,
    name: "Mountain Climbers",
    muscle: "Core",
    sets: "3 sets",
    reps: "20 reps",
    duration: "5 min",
  },
];

const Workout = () => {

    const navigate = useNavigate();

const {
  completedCount,
  progress,
  isCompleted,
  isMissed,
  completeExercise,
  workoutComplete,
  totalExercises,
} = useWorkout();

useEffect(() => {
  if (workoutComplete) {
    navigate("/workout/complete");
  }
}, [workoutComplete, navigate]);

  return (
    <div className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            TODAY'S TRAINING
          </p>

          <h1 className={styles.title}>
            Upper Body Strength
          </h1>

          <p className={styles.subtitle}>
            Build strength across your chest, shoulders,
            arms and core.
          </p>
        </div>

        <Badge variant="success">
          6 Exercises
        </Badge>
      </header>


      {/* WORKOUT SUMMARY */}

      <section className={styles.summaryGrid}>

        <BaseCard className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Duration
          </span>

          <strong className={styles.summaryValue}>
            45 min
          </strong>

          <span className={styles.summaryHint}>
            Estimated time
          </span>
        </BaseCard>

        <BaseCard className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Calories
          </span>

          <strong
            className={`${styles.summaryValue} ${styles.calories}`}
          >
            ~320
          </strong>

          <span className={styles.summaryHint}>
            Estimated burn
          </span>
        </BaseCard>

        <BaseCard className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Difficulty
          </span>

          <strong className={styles.summaryValue}>
            Medium
          </strong>

          <span className={styles.summaryHint}>
            Recommended
          </span>
        </BaseCard>

        <BaseCard className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Exercises
          </span>

          <strong className={styles.summaryValue}>
            6
          </strong>

          <span className={styles.summaryHint}>
            Full session
          </span>
        </BaseCard>

      </section>


      {/* WORKOUT PROGRESS */}

      <BaseCard className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <div>
            <p className={styles.cardEyebrow}>
              WORKOUT PROGRESS
            </p>

            <h2>
              Ready to start?
            </h2>
          </div>

          <strong className={styles.progressValue}>
            {completedCount} / {totalExercises}
          </strong>
        </div>

        <LinearProgress
          value={progress} 
          label="Exercises completed"
          showValue
        />

        <div className={styles.startRow}>
          <p>
            Complete each exercise to finish today's
            workout.
          </p>

          <Button size="medium">
            Start Workout
          </Button>
        </div>
      </BaseCard>


      {/* EXERCISES */}

      <section className={styles.exerciseSection}>

        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.cardEyebrow}>
              EXERCISES
            </p>

            <h2>
              Today's workout
            </h2>
          </div>

          <span className={styles.exerciseCount}>
            {completedCount} / {totalExercises} completed
          </span>
        </div>


        <div className={styles.exerciseList}>

          {exercises.map((exercise, index) => (
            <BaseCard
  key={exercise.id}
  interactive
  className={`${styles.exerciseCard} ${
    isCompleted(exercise.id)
      ? styles.completedExercise
      : ""
  } ${
    isMissed(exercise.id)
      ? styles.missedExercise
      : ""
  }`}
  onClick={() =>
    !isMissed(exercise.id) &&
    navigate(`/workout/exercise/${exercise.id}`)
  }
>
              <div className={styles.exerciseAction}>
  <span className={styles.arrow}>
    {isCompleted(exercise.id)
      ? "✓"
      : isMissed(exercise.id)
      ? "!"
      : "→"}
  </span>
</div>

              <div className={styles.exerciseInfo}>
                <div className={styles.exerciseTop}>
                  <h3>
                    {exercise.name}
                  </h3>

                  <Badge variant="neutral">
                    {exercise.muscle}
                  </Badge>
                </div>

                <div className={styles.exerciseMeta}>
                  <span>{exercise.sets}</span>
                  <span>{exercise.reps}</span>
                  <span>{exercise.duration}</span>
                </div>
              </div>

              <div className={styles.exerciseAction}>
                <span className={styles.arrow}>
                  →
                </span>
              </div>
            </BaseCard>
          ))}

        </div>
      </section>

      <WeeklyWorkout />


      {/* AI TIP */}

      <BaseCard
        elevated
        className={styles.aiCard}
      >
        <div className={styles.aiIcon}>
          ✦
        </div>

        <div className={styles.aiContent}>
          <p className={styles.cardEyebrow}>
            JYLIX AI COACH
          </p>

          <h2>
            Focus on controlled movement today.
          </h2>

          <p>
            Keep your form consistent and rest between
            sets. If an exercise feels too difficult,
            Jylix can recommend an alternative.
          </p>
        </div>

        <Button variant="secondary">
          Ask AI Coach
        </Button>
      </BaseCard>

    </div>
  );
};

export default Workout;