import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkout } from "@/hooks";

import {
  BaseCard,
  Button,
  Badge,
  LinearProgress,
} from "@/components";

import styles from "./ExerciseDetails.module.css";

const exercises = [
  {
    id: "1",
    name: "Push Ups",
    muscle: "Chest",
    sets: 3,
    reps: 12,
    duration: "8 min",
    rest: 60,
    instructions: [
      "Place your hands slightly wider than shoulder width.",
      "Keep your body straight from head to heels.",
      "Lower your chest with controlled movement.",
      "Push back up while keeping your core tight.",
    ],
  },
  {
    id: "2",
    name: "Dumbbell Shoulder Press",
    muscle: "Shoulders",
    sets: 3,
    reps: 10,
    duration: "8 min",
    rest: 60,
    instructions: [
      "Sit or stand with your back straight.",
      "Hold the dumbbells at shoulder level.",
      "Press both weights upward with control.",
      "Lower them slowly back to shoulder level.",
    ],
  },
  {
    id: "3",
    name: "Bicep Curls",
    muscle: "Biceps",
    sets: 3,
    reps: 12,
    duration: "7 min",
    rest: 60,
    instructions: [
      "Keep your elbows close to your body.",
      "Curl the weight toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Lower the weight slowly.",
    ],
  },
  {
    id: "4",
    name: "Tricep Dips",
    muscle: "Triceps",
    sets: 3,
    reps: 10,
    duration: "7 min",
    rest: 60,
    instructions: [
      "Keep your hands firmly positioned.",
      "Lower your body under control.",
      "Keep your elbows pointing backward.",
      "Push through your palms to return upward.",
    ],
  },
  {
    id: "5",
    name: "Plank",
    muscle: "Core",
    sets: 3,
    reps: 45,
    duration: "5 min",
    rest: 45,
    instructions: [
      "Place your elbows underneath your shoulders.",
      "Keep your body in a straight line.",
      "Brace your core throughout the movement.",
      "Keep your hips from dropping or rising.",
    ],
  },
  {
    id: "6",
    name: "Mountain Climbers",
    muscle: "Core",
    sets: 3,
    reps: 20,
    duration: "5 min",
    rest: 45,
    instructions: [
      "Start in a high plank position.",
      "Bring one knee toward your chest.",
      "Return it while driving the opposite knee forward.",
      "Maintain a controlled rhythm.",
    ],
  },
];

const ExerciseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise =
    exercises.find((item) => item.id === id) || exercises[0];

  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [isResting, setIsResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(exercise.rest);

  const {
  completeExercise,
} = useWorkout();

  useEffect(() => {
    if (!isResting) return;

    if (restSeconds <= 0) {
      setIsResting(false);
      setRestSeconds(exercise.rest);
      return;
    }

    const timer = setInterval(() => {
      setRestSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restSeconds, exercise.rest]);

  const completeSet = () => {
    if (completedSets.includes(currentSet)) return;

    const updatedSets = [...completedSets, currentSet];

    setCompletedSets(updatedSets);

    if (currentSet < exercise.sets) {
      setCurrentSet((set) => set + 1);
      setRestSeconds(exercise.rest);
      setIsResting(true);
    }
  };

  const finishExercise = () => {
  if (!isComplete) {
    return;
  }

  completeExercise(Number(exercise.id));

  navigate("/workout");
};

  const progress =
    (completedSets.length / exercise.sets) * 100;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const isComplete =
    completedSets.length === exercise.sets;

  return (
    <div className={styles.page}>

      {/* TOP BAR */}

      <div className={styles.topBar}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/workout")}
        >
          <span>←</span>
          Back to Workout
        </button>

        <span className={styles.exerciseNumber}>
          Exercise {exercise.id} / {exercises.length}
        </span>
      </div>


      {/* HEADER */}

      <header className={styles.header}>

        <div>
          <p className={styles.eyebrow}>
            CURRENT EXERCISE
          </p>

          <h1 className={styles.title}>
            {exercise.name}
          </h1>

          <p className={styles.subtitle}>
            Focus on controlled movement and proper form.
          </p>
        </div>

        <Badge variant="success">
          {exercise.muscle}
        </Badge>

      </header>


      {/* EXERCISE VISUAL */}

      <BaseCard className={styles.visualCard}>

        <div className={styles.visual}>
          <div className={styles.visualGlow}>
            ✦
          </div>

          <p>
            JYLIX EXERCISE
          </p>

          <h2>
            {exercise.name}
          </h2>

          <span>
            Follow the movement instructions below
          </span>
        </div>

      </BaseCard>


      {/* STATS */}

      <section className={styles.stats}>

        <BaseCard className={styles.stat}>
          <span>Sets</span>
          <strong>{exercise.sets}</strong>
        </BaseCard>

        <BaseCard className={styles.stat}>
          <span>Reps</span>
          <strong>{exercise.reps}</strong>
        </BaseCard>

        <BaseCard className={styles.stat}>
          <span>Duration</span>
          <strong>{exercise.duration}</strong>
        </BaseCard>

        <BaseCard className={styles.stat}>
          <span>Rest</span>
          <strong>{exercise.rest}s</strong>
        </BaseCard>

      </section>


      {/* PROGRESS */}

      <BaseCard className={styles.progressCard}>

        <div className={styles.progressHeader}>
          <div>
            <p className={styles.cardEyebrow}>
              EXERCISE PROGRESS
            </p>

            <h2>
              Set {currentSet} of {exercise.sets}
            </h2>
          </div>

          <strong>
            {completedSets.length}/{exercise.sets}
          </strong>
        </div>

        <LinearProgress
          value={progress}
          label="Sets completed"
          showValue
        />

      </BaseCard>


      {/* SET TRACKER */}

      <BaseCard className={styles.setCard}>

        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.cardEyebrow}>
              SETS
            </p>

            <h2>
              Complete your sets
            </h2>
          </div>
        </div>

        <div className={styles.setList}>

          {Array.from(
            { length: exercise.sets },
            (_, index) => {
              const setNumber = index + 1;
              const completed =
                completedSets.includes(setNumber);
              const active =
                currentSet === setNumber && !completed;

              return (
                <div
                  key={setNumber}
                  className={`${styles.setRow} ${
                    active ? styles.activeSet : ""
                  } ${completed ? styles.completedSet : ""}`}
                >
                  <div className={styles.setNumber}>
                    {completed ? "✓" : setNumber}
                  </div>

                  <div className={styles.setInfo}>
                    <strong>
                      Set {setNumber}
                    </strong>

                    <span>
                      {exercise.reps} reps
                    </span>
                  </div>

                  <span className={styles.setStatus}>
                    {completed
                      ? "Completed"
                      : active
                      ? "Current"
                      : "Upcoming"}
                  </span>
                </div>
              );
            }
          )}

        </div>


        {/* REST TIMER */}

        {isResting && (
          <div className={styles.restBox}>

            <div>
              <p>
                REST
              </p>

              <strong>
                {formatTime(restSeconds)}
              </strong>
            </div>

            <button
              onClick={() => {
                setIsResting(false);
                setRestSeconds(exercise.rest);
              }}
            >
              Skip Rest
            </button>

          </div>
        )}


        {/* ACTION */}

        <div className={styles.actionArea}>

          {!isComplete ? (
            <Button
              size="large"
              onClick={completeSet}
              disabled={isResting}
            >
              {isResting
                ? `Rest ${formatTime(restSeconds)}`
                : `Complete Set ${currentSet}`}
            </Button>
          ) : (
            <Button
              size="large"
              onClick={finishExercise}
            >
              Complete Exercise →
            </Button>
          )}

        </div>

      </BaseCard>


      {/* INSTRUCTIONS */}

      <BaseCard className={styles.instructionsCard}>

        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.cardEyebrow}>
              FORM GUIDE
            </p>

            <h2>
              How to perform
            </h2>
          </div>
        </div>

        <ol className={styles.instructions}>

          {exercise.instructions.map(
            (instruction, index) => (
              <li key={instruction}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>
                  {instruction}
                </p>
              </li>
            )
          )}

        </ol>

      </BaseCard>


      {/* AI TIP */}

      <BaseCard
        elevated
        className={styles.aiCard}
      >

        <div className={styles.aiIcon}>
          ✦
        </div>

        <div className={styles.aiContent}>
          <p className={styles.cardEyebrow}>
            JYLIX AI COACH
          </p>

          <h2>
            Keep your movement controlled.
          </h2>

          <p>
            Quality repetitions matter more than speed.
            Focus on your breathing and maintain proper
            form throughout each set.
          </p>
        </div>

        <Button variant="secondary">
          Ask AI Coach
        </Button>

      </BaseCard>

    </div>
  );
};

export default ExerciseDetails;