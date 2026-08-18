import styles from "./Chip.module.css";

const Chip = ({
  children,
  variant = "default",
  size = "medium",
  selected = false,
  disabled = false,
  className = "",
  onClick,
}) => {
  const classes = [
    styles.chip,
    variant !== "default" ? styles[variant] : "",
    selected ? styles.selected : "",
    size === "small" ? styles.small : "",
    size === "large" ? styles.large : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Chip;