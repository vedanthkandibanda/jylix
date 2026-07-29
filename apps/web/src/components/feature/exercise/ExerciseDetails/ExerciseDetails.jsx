import {
  BaseCard,
  Button,
  Chip,
  WorkoutDifficulty,
} from "@/components";

import styles from "./ExerciseDetails.module.css";

const ExerciseDetails = ({
  name,
  difficulty,
  muscleGroups = [],
  equipment,
  sets,
  reps,
  restTime,
  description,
  onStart,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {name}
        </h2>

        <WorkoutDifficulty
          level={difficulty}
        />
      </div>

      <div className={styles.chips}>
        {muscleGroups.map((muscle) => (
          <Chip key={muscle} disabled>
            {muscle}
          </Chip>
        ))}
      </div>

      <div className={styles.stats}>
        <div>
          <span>Equipment</span>
          <strong>{equipment}</strong>
        </div>

        <div>
          <span>Sets</span>
          <strong>{sets}</strong>
        </div>

        <div>
          <span>Reps</span>
          <strong>{reps}</strong>
        </div>

        <div>
          <span>Rest</span>
          <strong>{restTime}</strong>
        </div>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>

        <p>{description}</p>
      </div>

      <Button
        fullWidth
        onClick={onStart}
      >
        Start Exercise
      </Button>
    </BaseCard>
  );
};

export default ExerciseDetails;