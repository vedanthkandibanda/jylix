import { BaseCard } from "@/components";

import styles from "./ProgressTimeline.module.css";

const ProgressTimeline = ({
  title = "Fitness Journey",
  events = [],
}) => {
  return (
    <BaseCard className={styles.card}>
      <h2 className={styles.heading}>
        {title}
      </h2>

      <div className={styles.timeline}>
        {events.map((event) => (
          <div
            key={event.id}
            className={styles.item}
          >
            <div className={styles.marker}>
              ●
            </div>

            <div className={styles.content}>
              <span className={styles.date}>
                {event.date}
              </span>

              <h4 className={styles.title}>
                {event.title}
              </h4>

              <p className={styles.description}>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default ProgressTimeline;