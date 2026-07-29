import {
  BaseCard,
  Button,
  Chip,
} from "@/components";

import styles from "./FoodItem.module.css";

const FoodItem = ({
  name,
  category,
  calories,
  protein,
  carbs,
  fat,
  onAdd,
}) => {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {name}
        </h3>

        <Chip disabled>
          {category}
        </Chip>
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
        onClick={onAdd}
      >
        Add Food
      </Button>
    </BaseCard>
  );
};

export default FoodItem;