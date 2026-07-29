import BaseCard from "../../cards/BaseCard";
import Button from "../../buttons/Button";
import Badge from "../../badge/Badge";
import Chip from "../../chip/Chip";

import styles from "./WorkoutCard.module.css";

const WorkoutCard = ({
  title,
  level,
  duration,
  calories,
  exercises,
  progress,
  muscles = [],
  onContinue,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <Badge variant="primary">
          {level}
        </Badge>
      </div>

      <div className={styles.muscles}>
        {muscles.map((muscle) => (
          <Chip
            key={muscle}
            disabled
          >
            {muscle}
          </Chip>
        ))}
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Duration</span>
          <span>{duration} min</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.label}>Calories</span>
          <span>{calories} kcal</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.label}>Exercises</span>
          <span>{exercises}</span>
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span className={styles.progressText}>
          {progress}%
        </span>
      </div>

      <Button
        fullWidth
        onClick={onContinue}
      >
        Continue Workout
      </Button>
    </BaseCard>
  );
};

export default WorkoutCard;