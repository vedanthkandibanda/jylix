import {
  BaseCard,
  Button,
} from "@/components";

import styles from "./GoalCard.module.css";

const GoalCard = ({
  title,
  current,
  target,
  progress,
  remainingDays,
  onView,
}) => {
  return (
    <BaseCard className={styles.card}>
      <h3 className={styles.title}>
        {title}
      </h3>

      <div className={styles.details}>
        <div>
          <span>Current</span>
          <strong>{current}</strong>
        </div>

        <div>
          <span>Target</span>
          <strong>{target}</strong>
        </div>
      </div>

      <div className={styles.progressSection}>
        <LinearProgress
    value={progress}
/>

        <span className={styles.progressText}>
          {progress}% Complete
        </span>
      </div>

      <p className={styles.remaining}>
        {remainingDays} Days Remaining
      </p>

      <Button
        fullWidth
        onClick={onView}
      >
        View Goal
      </Button>
    </BaseCard>
  );
};

export default GoalCard;