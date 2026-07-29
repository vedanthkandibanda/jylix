import styles from "./LinearProgress.module.css";

const LinearProgress = ({
  value = 0,
  max = 100,
  showLabel = false,
  color = "primary",
}) => {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[color]}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {showLabel && (
        <span className={styles.label}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

export default LinearProgress;