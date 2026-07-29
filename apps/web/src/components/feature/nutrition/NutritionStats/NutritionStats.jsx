import { BaseCard } from "@/components";

import styles from "./NutritionStats.module.css";

const NutritionStats = ({
  title = "Today's Nutrition",
  calories = {},
  protein = {},
  carbs = {},
  fat = {},
  water = {},
}) => {
  const stats = [
    {
      label: "Calories",
      value: `${calories.current} / ${calories.goal} kcal`,
    },
    {
      label: "Protein",
      value: `${protein.current} / ${protein.goal} g`,
    },
    {
      label: "Carbs",
      value: `${carbs.current} / ${carbs.goal} g`,
    },
    {
      label: "Fat",
      value: `${fat.current} / ${fat.goal} g`,
    },
    {
      label: "Water",
      value: `${water.current} / ${water.goal} L`,
    },
  ];

  return (
    <BaseCard className={styles.card}>
      <h2 className={styles.heading}>
        {title}
      </h2>

      <div className={styles.stats}>
  {stats.map((stat) => (
    <StatCard
      key={stat.label}
      label={stat.label}
      value={stat.value}
    />
  ))}
</div>
    </BaseCard>
  );
};

export default NutritionStats;