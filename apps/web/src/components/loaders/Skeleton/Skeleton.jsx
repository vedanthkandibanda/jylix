import styles from "./Skeleton.module.css";

const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "var(--radius-md)",
  className = "",
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;