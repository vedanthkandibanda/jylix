import {
  BaseCard,
  StatCard,
} from "@/components";

import styles from "./WorkoutStats.module.css";

const WorkoutStats = ({
  duration,
  calories,
  exercises,
  streak,
  completion,
  level,
}) => {
  const stats = [
    {
      label: "Duration",
      value: `${duration} min`,
    },
    {
      label: "Calories",
      value: `${calories} kcal`,
    },
    {
      label: "Exercises",
      value: exercises,
    },
    {
      label: "Streak",
      value: `${streak} Days`,
    },
    {
      label: "Completion",
      value: `${completion}%`,
    },
    {
      label: "Level",
      value: level,
    },
  ];

  return (
    <BaseCard className={styles.card}>
  <h2 className={styles.heading}>
    Workout Stats
  </h2>

  <div className={styles.grid}>
    {stats.map((stat) => (
      <StatCard
        key={stat.label}
        label={stat.label}
        value={stat.value}
      />
    ))}
  </div>
</BaseCard>
  );
};

export default WorkoutStats;