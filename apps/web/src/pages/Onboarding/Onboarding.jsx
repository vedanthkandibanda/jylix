import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Onboarding.module.css";

const steps = [
  {
    id: "goal",
    title: "What is your main goal?",
    description: "Jylix will use this to shape your fitness journey.",
    options: [
      "Build Muscle",
      "Lose Weight",
      "Improve Fitness",
      "Build Strength",
    ],
  },
  {
    id: "level",
    title: "What's your fitness level?",
    description: "We'll keep your starting point in mind.",
    options: [
      "Beginner",
      "Intermediate",
      "Advanced",
    ],
  },
  {
    id: "preference",
    title: "How do you prefer to train?",
    description: "Choose what fits naturally into your routine.",
    options: [
      "Gym",
      "Home",
      "Outdoor",
      "Mixed",
    ],
  },
];

const Onboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({
    goal: "",
    level: "",
    preference: "",
  });

  const currentStep = steps[step];

  const selectedValue = answers[currentStep.id];

  const handleSelect = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [currentStep.id]: value,
    }));
  };

  const handleContinue = () => {
    if (!selectedValue) return;

    if (step < steps.length - 1) {
      setStep((previous) => previous + 1);
      return;
    }

    localStorage.setItem(
      "jylix_onboarding",
      JSON.stringify(answers)
    );

    navigate("/dashboard");
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((previous) => previous - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <header className={styles.header}>
          <span className={styles.logo}>
            JYLIX
          </span>

          <span className={styles.step}>
            {step + 1} / {steps.length}
          </span>
        </header>

        <div className={styles.progressTrack}>
          <div
            className={styles.progress}
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        <section className={styles.content}>

          <span className={styles.eyebrow}>
            LET'S PERSONALIZE JYLIX
          </span>

          <h1>
            {currentStep.title}
          </h1>

          <p className={styles.description}>
            {currentStep.description}
          </p>

          <div className={styles.options}>
            {currentStep.options.map((option) => {
              const isSelected =
                selectedValue === option;

              return (
                <button
                  key={option}
                  type="button"
                  className={`${styles.option} ${
                    isSelected
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() =>
                    handleSelect(option)
                  }
                >
                  <span>{option}</span>

                  <span
                    className={styles.check}
                    aria-hidden="true"
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.actions}>

            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="button"
              className={styles.continueButton}
              disabled={!selectedValue}
              onClick={handleContinue}
            >
              {step === steps.length - 1
                ? "Create My Plan"
                : "Continue"}
            </button>

          </div>

        </section>
      </div>
    </main>
  );
};

export default Onboarding;