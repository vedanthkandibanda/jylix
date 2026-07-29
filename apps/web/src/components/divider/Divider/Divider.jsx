import styles from "./Divider.module.css";

const Divider = ({
  orientation = "horizontal",
  variant = "default",
  thickness = "medium",
  label,
  className = "",
}) => {
  const classes = [
    styles.divider,
    styles[orientation],
    styles[variant],
    styles[thickness],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (label) {
    return (
      <div className={classes}>
        <span className={styles.line} />
        <span className={styles.label}>
          {label}
        </span>
        <span className={styles.line} />
      </div>
    );
  }

  return (
    <div
      className={classes}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

export default Divider;