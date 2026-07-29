import {
  BaseCard,
  Button,
  Badge,
} from "@/components";

import styles from "./AchievementCard.module.css";

const AchievementCard = ({
  title,
  description,
  earnedDate,
  rarity = "Common",
  icon = "🏆",
  onView,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <span className={styles.icon}>
            {icon}
          </span>

          <h3 className={styles.title}>
            {title}
          </h3>
        </div>

        <Badge variant="warning">
          {rarity}
        </Badge>
      </div>

      <p className={styles.description}>
        {description}
      </p>

      <p className={styles.date}>
        Earned: {earnedDate}
      </p>

      <Button
        fullWidth
        onClick={onView}
      >
        View Achievement
      </Button>
    </BaseCard>
  );
};

export default AchievementCard;