import {
  BaseCard,
  StatCard,
} from "@/components";

import styles from "./ProgressCard.module.css";

const ProgressCard = ({
  title,
  current,
  goal,
  progress,
}) => {
  return (
    <BaseCard className={styles.card}>
      <h3 className={styles.heading}>
        {title}
      </h3>

      <div className={styles.stats}>
        <StatCard
          label="Current"
          value={current}
        />

        <StatCard
          label="Goal"
          value={goal}
        />
      </div>

      <div className={styles.progress}>
        <LinearProgress
    value={progress}
/>

        <span>{progress}%</span>
      </div>
    </BaseCard>
  );
};

export default ProgressCard;