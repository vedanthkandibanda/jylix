import { ExerciseItem } from "@/components";

import styles from "./ExerciseList.module.css";

const ExerciseList = ({
  title = "Exercises",
  exercises = [],
  onExerciseClick,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {title}
      </h2>

      <div className={styles.list}>
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            {...exercise}
            onClick={() =>
              onExerciseClick?.(exercise)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;