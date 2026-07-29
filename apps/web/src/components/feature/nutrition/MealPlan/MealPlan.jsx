import { MealCard } from "@/components";

import styles from "./MealPlan.module.css";

const MealPlan = ({
  title = "Today's Meal Plan",
  meals = [],
  onMealClick,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        {title}
      </h2>

      <div className={styles.list}>
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            {...meal}
            onView={() =>
              onMealClick?.(meal)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default MealPlan;