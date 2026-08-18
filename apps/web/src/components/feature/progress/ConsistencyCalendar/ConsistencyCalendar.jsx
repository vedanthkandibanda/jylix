import { useWorkout } from "@/hooks";

import styles from "./ConsistencyCalendar.module.css";

const getMonthDays = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const startingDay =
  (firstDay.getDay() + 6) % 7;

  const days = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return {
    year,
    month,
    days,
  };
};

const ConsistencyCalendar = () => {
  const { weeklyHistory } = useWorkout();

  const {
    year,
    month,
    days,
  } = getMonthDays();

  const history = JSON.parse(
    localStorage.getItem(
      "jylix-workout-history"
    ) || "{}"
  );

  const today = new Date().getDate();

  const monthName = new Date(
    year,
    month,
    1
  ).toLocaleString("en-US", {
    month: "long",
  });

  const getStatus = (day) => {
  if (!day) return "";

  const dateKey = `${year}-${String(
    month + 1
  ).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;

  const workout = history[dateKey];

  if (workout?.completed) {
    return styles.completed;
  }

  if (day === today) {
    return styles.today;
  }

  if (day < today && workout) {
    return styles.missed;
  }

  return styles.future;
};

  return (
    <div className={styles.calendar}>

      <div className={styles.header}>
        <h3>
          {monthName} {year}
        </h3>

        <span>
          Monthly consistency
        </span>
      </div>

      <div className={styles.weekdays}>
        {[
          "M",
          "T",
          "W",
          "T",
          "F",
          "S",
          "S",
        ].map((day, index) => (
          <span key={`${day}-${index}`}>
            {day}
          </span>
        ))}
      </div>

      <div className={styles.grid}>

        {days.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={`${styles.day} ${
              day ? getStatus(day) : styles.empty
            }`}
          >
            {day && <span>{day}</span>}
          </div>
        ))}

        <span>
    <i className={styles.greenDot} />
    Completed
  </span>

  <span>
    <i className={styles.redDot} />
    Missed
  </span>

  <span>
    <i className={styles.todayDot} />
    Today
  </span>
      </div>

    </div>
  );
};

export default ConsistencyCalendar;