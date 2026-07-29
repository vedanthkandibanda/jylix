import { Badge } from "@/components";

const variantMap = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

const WorkoutDifficulty = ({
  level = "Beginner",
}) => {
  return (
    <Badge
      variant={
        variantMap[level] || "secondary"
      }
    >
      {level}
    </Badge>
  );
};

export default WorkoutDifficulty;