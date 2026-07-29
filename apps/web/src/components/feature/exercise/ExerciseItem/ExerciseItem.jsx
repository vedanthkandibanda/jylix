import {
  Chip,
  WorkoutDifficulty,
} from "@/components";

import styles from "./ExerciseItem.module.css";

const ExerciseItem = ({
  name,
  muscleGroup,
  sets,
  reps,
  difficulty,
  completed = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.item}
      onClick={onClick}
    >
      <div className={styles.left}>
        <div
          className={`${styles.status} ${
            completed ? styles.completed : ""
          }`}
        />

        <div className={styles.info}>
          <h4 className={styles.title}>
            {name}
          </h4>

          <div className={styles.meta}>
            <Chip disabled>
              {muscleGroup}
            </Chip>

            <span>{sets} Sets</span>

            <span>{reps} Reps</span>
          </div>
        </div>
      </div>

      <WorkoutDifficulty
        level={difficulty}
      />
    </button>
  );
};

export default ExerciseItem;