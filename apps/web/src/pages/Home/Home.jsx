import React from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.page}>

      {/* Hero */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <span className={styles.eyebrow}>
            AI-POWERED FITNESS
          </span>

          <h1>
            Fitness that
            <span> thinks with you.</span>
          </h1>

          <p>
            Jylix combines your goals, workouts,
            nutrition and progress into one
            intelligent fitness experience.
          </p>

          <div className={styles.actions}>
            <Link
              to="/onboarding"
              className={styles.primaryButton}
            >
              Start Your Journey
            </Link>

            <a
              href="#how-it-works"
              className={styles.secondaryButton}
            >
              Explore Jylix
            </a>
          </div>

        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>

            <span>JYLIX AI</span>

            <h3>
              Your fitness.
              <br />
              Your intelligence.
            </h3>

            <p>
              Personalized decisions,
              every day.
            </p>

          </div>
        </div>
      </section>


      {/* Core Value */}

      <section className={styles.valueSection}>

        <span className={styles.eyebrow}>
          ONE SYSTEM
        </span>

        <h2>
          Everything your fitness
          journey needs.
        </h2>

        <p>
          Instead of managing separate workout,
          nutrition and progress apps, Jylix
          connects everything around you.
        </p>

      </section>


      {/* How It Works */}

      <section
        id="how-it-works"
        className={styles.section}
      >

        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            HOW IT WORKS
          </span>

          <h2>
            From intention to action.
          </h2>
        </div>

        <div className={styles.steps}>

          <div className={styles.step}>
            <span>01</span>

            <h3>
              Tell Jylix your goal.
            </h3>

            <p>
              Build muscle, lose weight,
              improve fitness or simply
              become healthier.
            </p>
          </div>

          <div className={styles.step}>
            <span>02</span>

            <h3>
              Jylix builds your plan.
            </h3>

            <p>
              Your workouts, nutrition
              and daily targets adapt
              around your goals.
            </p>
          </div>

          <div className={styles.step}>
            <span>03</span>

            <h3>
              Keep improving.
            </h3>

            <p>
              Jylix learns from your
              progress and helps you
              make better decisions.
            </p>
          </div>

        </div>

      </section>


      {/* AI Preview */}

      <section className={styles.aiSection}>

        <div>
          <span className={styles.eyebrow}>
            JYLIX AI COACH
          </span>

          <h2>
            Your coach isn't
            just a plan.
          </h2>

          <p>
            Ask Jylix what to do, what to eat,
            how to adjust your workout or
            why your progress has changed.
          </p>
        </div>

        <div className={styles.chatCard}>

          <div className={styles.messageUser}>
            What should I do today?
          </div>

          <div className={styles.messageAI}>
            Based on your goal and recent
            activity, today's focus should be
            your upper body workout.

            <strong>
              4 exercises · 35 min
            </strong>
          </div>

        </div>

      </section>


      {/* Final CTA */}

      <section className={styles.cta}>

        <span className={styles.eyebrow}>
          START TODAY
        </span>

        <h2>
          Your better routine
          starts here.
        </h2>

        <p>
          Let Jylix turn your fitness goals
          into something you can actually
          follow.
        </p>

        <Link
          to="/onboarding"
          className={styles.primaryButton}
        >
          Build My Plan
        </Link>

      </section>

    </main>
  );
};

export default Home;