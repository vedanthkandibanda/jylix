import { useNavigate } from "react-router-dom";

import { BaseCard, Button } from "@/components";

import styles from "./WorkoutComplete.module.css";

const WorkoutComplete = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      <div className={styles.eyebrow}>
        WORKOUT COMPLETE
      </div>

      <div className={styles.hero}>
        <div className={styles.icon}>
          ✓
        </div>

        <h1>Great job, Vedanth.</h1>

        <p>
          You completed today's Upper Body Strength workout.
          Keep the momentum going.
        </p>
      </div>

      <BaseCard className={styles.summary}>

        <div className={styles.summaryHeader}>
          <div>
            <p>SESSION SUMMARY</p>
            <h2>Upper Body Strength</h2>
          </div>

          <span className={styles.complete}>
            Completed
          </span>
        </div>

        <div className={styles.stats}>

          <div>
            <span>Duration</span>
            <strong>45 min</strong>
          </div>

          <div>
            <span>Calories</span>
            <strong className={styles.orange}>320</strong>
          </div>

          <div>
            <span>Exercises</span>
            <strong>6 / 6</strong>
          </div>

          <div>
            <span>Progress</span>
            <strong className={styles.green}>100%</strong>
          </div>

        </div>

      </BaseCard>

      <BaseCard className={styles.aiCard}>

        <div className={styles.aiIcon}>
          ✦
        </div>

        <div>
          <p className={styles.aiLabel}>
            JYLIX AI COACH
          </p>

          <h2>
            You're building consistency.
          </h2>

          <p>
            Completing today's workout keeps you moving
            toward your strength goal. Stay hydrated and
            give your muscles time to recover.
          </p>
        </div>

      </BaseCard>

      <div className={styles.actions}>

        <Button
          size="large"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>

        <button
          className={styles.secondary}
          onClick={() => navigate("/progress")}
        >
          View Progress →
        </button>

      </div>

    </div>
  );
};

export default WorkoutComplete;