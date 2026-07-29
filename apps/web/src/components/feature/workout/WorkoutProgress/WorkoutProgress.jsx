import { BaseCard } from "@/components";

import styles from "./WorkoutProgress.module.css";

const WorkoutProgress = ({
  progress = 0,
  completedExercises = 0,
  totalExercises = 0,
  goal = "",
}) => {
  return (
    <BaseCard className={styles.card}>
      <h3 className={styles.heading}>
        Workout Progress
      </h3>

      <div className={styles.circleContainer}>
        <span className={styles.percentage}>
          {progress}%
        </span>
      </div>

      <LinearProgress
    value={progress}
    showLabel
/>

      <p className={styles.completed}>
        {progress}% Completed
      </p>

      <div className={styles.info}>
        <div>
          <span className={styles.label}>Goal</span>
          <p>{goal}</p>
        </div>

        <div>
          <span className={styles.label}>
            Exercises
          </span>

          <p>
            {completedExercises} / {totalExercises}
          </p>
        </div>
      </div>
    </BaseCard>
  );
};

export default WorkoutProgress;