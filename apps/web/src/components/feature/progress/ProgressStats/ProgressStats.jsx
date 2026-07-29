import {
  BaseCard,
  StatCard,
} from "@/components";

import styles from "./ProgressStats.module.css";

const ProgressStats = ({
  title = "Overall Progress",
  workouts = 0,
  goals = 0,
  achievements = 0,
  streak = 0,
  activeDays = 0,
}) => {
  const stats = [
    {
      label: "Total Workouts",
      value: workouts,
    },
    {
      label: "Goals Completed",
      value: goals,
    },
    {
      label: "Achievements",
      value: achievements,
    },
    {
      label: "Current Streak",
      value: `${streak} Days`,
    },
    {
      label: "Active Days",
      value: activeDays,
    },
  ];

  return (
    <BaseCard className={styles.card}>
      <h2 className={styles.heading}>
        {title}
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

export default ProgressStats;