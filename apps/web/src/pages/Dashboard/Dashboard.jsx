import {
  BaseCard,
  StatCard,
  Button,
  Badge,
  LinearProgress,
} from "@/components";

import styles from "./Dashboard.module.css";
import { ConsistencyCard } from "@/components";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>

      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            YOUR FITNESS JOURNEY
          </p>

          <h1 className={styles.title}>
            Good morning, Vedanth
            <span className={styles.wave}>👋</span>
          </h1>

          <p className={styles.subtitle}>
            Stay consistent. Your goals are getting closer.
          </p>
        </div>

        <Badge variant="success">
          ● On Track
        </Badge>
      </header>


      {/* OVERVIEW */}
      <section className={styles.overview}>
        <StatCard
          title="Weight"
          value="55 kg"
          subtitle="Current weight"
          icon="⚖"
        />

        <StatCard
          title="Calories"
          value="1,850"
          subtitle="of 2,400 kcal"
          icon="◉"
          variant="calories"
        />

        <StatCard
          title="Workout"
          value="45 min"
          subtitle="Today's target"
          icon="◌"
          variant="success"
        />

        <StatCard
          title="Water"
          value="2.1 L"
          subtitle="of 3 L"
          icon="◒"
          variant="water"
        />
      </section>


      {/* MAIN GRID */}
      <section className={styles.mainGrid}>

        {/* WORKOUT */}
        <BaseCard className={styles.workoutCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardEyebrow}>
                TODAY'S WORKOUT
              </p>

              <h2>
                Upper Body Strength
              </h2>

              <p className={styles.cardDescription}>
                Chest, shoulders, arms and core.
              </p>
            </div>

            <Badge variant="success">
              6 Exercises
            </Badge>
          </div>

          <div className={styles.workoutMeta}>
            <span>⏱ 45 min</span>
            <span>🔥 Medium</span>
            <span>💪 Strength</span>
          </div>

          <div className={styles.workoutFooter}>
            <div className={styles.workoutProgress}>
              <div className={styles.progressLabel}>
                <span>Workout progress</span>
                <span>0%</span>
              </div>

              <LinearProgress value={0} />
            </div>

            <Button size="medium">
              Start Workout
            </Button>
          </div>
        </BaseCard>


        {/* PROGRESS */}
        <BaseCard className={styles.progressCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardEyebrow}>
                TODAY
              </p>

              <h2>
                Daily Progress
              </h2>
            </div>

            <strong className={styles.progressPercent}>
              68%
            </strong>
          </div>

          <div className={styles.progressList}>
            <LinearProgress
              value={68}
              label="Workout"
              showValue
            />

            <LinearProgress
              value={72}
              label="Calories"
              variant="calories"
              showValue
            />

            <LinearProgress
              value={52}
              label="Water"
              variant="water"
              showValue
            />

            <LinearProgress
              value={84}
              label="Recovery"
              variant="sleep"
              showValue
            />
          </div>
        </BaseCard>

      </section>


      {/* AI COACH */}
      <section>
        <BaseCard
          elevated
          className={styles.aiCard}
        >
          <div className={styles.aiContent}>

            <div className={styles.aiIcon}>
              ✦
            </div>

            <div className={styles.aiText}>
              <div className={styles.aiHeading}>
                <span className={styles.cardEyebrow}>
                  JYLIX AI COACH
                </span>

                <Badge variant="info">
                  AI Insight
                </Badge>
              </div>

              <h2>
                You're ready for today's workout.
              </h2>

              <p>
                Your activity level looks consistent.
                Keep your workout intensity moderate today
                and stay hydrated throughout the session.
              </p>
            </div>

            <Button variant="secondary">
              Ask AI Coach
            </Button>

          </div>
        </BaseCard>
      </section>

      <ConsistencyCard />


      {/* QUICK ACTIONS */}
      <section>
        <div className={styles.sectionHeader}>
          <p className={styles.cardEyebrow}>
            QUICK ACTIONS
          </p>

          <h2>
            Keep moving
          </h2>
        </div>

        <div className={styles.actions}>

          <BaseCard interactive>
            <div className={styles.action}>
              <span className={styles.actionIcon}>
                🥗
              </span>

              <div>
                <h3>Meal Plan</h3>
                <p>View today's meals</p>
              </div>

              <span className={styles.arrow}>
                →
              </span>
            </div>
          </BaseCard>


          <BaseCard interactive>
            <div className={styles.action}>
              <span className={styles.actionIcon}>
                📈
              </span>

              <div>
                <h3>Progress</h3>
                <p>Track your improvement</p>
              </div>

              <span className={styles.arrow}>
                →
              </span>
            </div>
          </BaseCard>


          <BaseCard interactive>
            <div className={styles.action}>
              <span className={styles.actionIcon}>
                🎯
              </span>

              <div>
                <h3>Missions</h3>
                <p>Complete today's goals</p>
              </div>

              <span className={styles.arrow}>
                →
              </span>
            </div>
          </BaseCard>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;