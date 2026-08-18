import styles from "./LinearProgress.module.css";

const LinearProgress = ({
  value = 0,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "medium",
  className = "",
}) => {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  const classes = [
    styles.wrapper,
    variant !== "default" ? styles[variant] : "",
    size === "small" ? styles.small : "",
    size === "large" ? styles.large : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label && (
            <span className={styles.label}>
              {label}
            </span>
          )}

          {showValue && (
            <span className={styles.value}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className={styles.track}>
        <div
          className={styles.bar}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LinearProgress;