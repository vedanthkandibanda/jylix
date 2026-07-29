import {
  BaseCard,
  Button,
  Badge,
  Chip,
} from "@/components";

import styles from "./ExerciseCard.module.css";

const ExerciseCard = ({
  name,
  muscleGroup,
  sets,
  reps,
  difficulty,
  onStart,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {name}
        </h3>

        <Badge variant="primary">
          {difficulty}
        </Badge>
      </div>

      <Chip disabled>
        {muscleGroup}
      </Chip>

      <div className={styles.stats}>
        <div>
          <span className={styles.label}>
            Sets
          </span>

          <p>{sets}</p>
        </div>

        <div>
          <span className={styles.label}>
            Reps
          </span>

          <p>{reps}</p>
        </div>
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

export default ExerciseCard;
