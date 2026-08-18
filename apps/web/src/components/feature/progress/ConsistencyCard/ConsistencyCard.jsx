import { BaseCard } from "@/components";
import { useWorkout } from "@/hooks";

import ConsistencyCalendar from "../ConsistencyCalendar";

import styles from "./ConsistencyCard.module.css";

const ConsistencyCard = () => {
  const {
    weeklyHistory,
    currentStreak,
    monthlyStats,
  } = useWorkout();

  const weeklyCompleted =
    weeklyHistory.filter(
      (day) => day.completed
    ).length;

  return (
    <BaseCard className={styles.card}>

      <div className={styles.top}>

        <div>
          <p className={styles.label}>
            CONSISTENCY
          </p>

          <h2>
            Stay consistent.
          </h2>

          <p className={styles.description}>
            Every completed workout builds your
            momentum.
          </p>
        </div>

        <div className={styles.score}>
          <strong>
            {monthlyStats.consistency}%
          </strong>

          <span>
            this month
          </span>
        </div>

      </div>


      <div className={styles.stats}>

        <div>
          <strong>
            {monthlyStats.completed}
          </strong>

          <span>
            Workouts
          </span>
        </div>

        <div>
          <strong>
            {weeklyCompleted}
          </strong>

          <span>
            This week
          </span>
        </div>

        <div>
          <strong>
            {currentStreak}
          </strong>

          <span>
            Day streak
          </span>
        </div>

      </div>


      <ConsistencyCalendar />

    </BaseCard>
  );
};

export default ConsistencyCard;