import {
  BaseCard,
  Button,
  Badge,
} from "@/components";

import styles from "./MealCard.module.css";

const MealCard = ({
  mealType,
  title,
  calories,
  protein,
  carbs,
  fat,
  onView,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <Badge variant="info">
          {mealType}
        </Badge>
      </div>

      <div className={styles.nutrition}>
        <div>
          <span>Calories</span>
          <strong>{calories} kcal</strong>
        </div>

        <div>
          <span>Protein</span>
          <strong>{protein} g</strong>
        </div>

        <div>
          <span>Carbs</span>
          <strong>{carbs} g</strong>
        </div>

        <div>
          <span>Fat</span>
          <strong>{fat} g</strong>
        </div>
      </div>

      <Button
        fullWidth
        onClick={onView}
      >
        View Meal
      </Button>
    </BaseCard>
  );
};

export default MealCard;