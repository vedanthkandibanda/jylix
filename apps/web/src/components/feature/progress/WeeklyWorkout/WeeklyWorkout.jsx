import { useWorkout } from "@/hooks";

import styles from "./WeeklyWorkout.module.css";

const WeeklyWorkout = () => {
  const { weeklyHistory } = useWorkout();

  const completedDays = weeklyHistory.filter(
    (day) => day.completed
  ).length;

  return (
    <section className={styles.wrapper}>

      <div className={styles.header}>

        <div>
          <span className={styles.label}>
            WEEKLY TRAINING
          </span>

          <h2>
            Training consistency
          </h2>
        </div>

        <span className={styles.count}>
          {completedDays} / 7 days
        </span>

      </div>


      <div className={styles.days}>

        {weeklyHistory.map((item) => (

          <div
            key={item.date}
            className={`${styles.day} ${
              item.isToday ? styles.current : ""
            }`}
          >

            <span className={styles.dayName}>
              {item.day}
            </span>


            <div
              className={`${styles.status} ${
                item.completed
                  ? styles.completed
                  : ""
              }`}
            >
              {item.completed ? "✓" : "—"}
            </div>


            <span className={styles.duration}>
              {item.completed
                ? `${item.duration}m`
                : item.isToday
                ? "Today"
                : "Rest"}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
};

export default WeeklyWorkout;