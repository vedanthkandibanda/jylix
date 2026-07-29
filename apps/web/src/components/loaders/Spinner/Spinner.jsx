import styles from "./Spinner.module.css";

const Spinner = ({
  size = "md",
  className = "",
  label = "Loading...",
}) => {
  const classes = [
    styles.spinner,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={classes} />
    </div>
  );
};

export default Spinner;