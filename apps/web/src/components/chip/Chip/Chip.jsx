import styles from "./Chip.module.css";

const Chip = ({
  children,
  selected = false,
  removable = false,
  disabled = false,
  onClick,
  onRemove,
  className = "",
}) => {
  const classes = [
    styles.chip,
    selected ? styles.selected : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleRemove = (event) => {
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.label}>
        {children}
      </span>

      {removable && (
        <span
          className={styles.remove}
          onClick={handleRemove}
          role="button"
          tabIndex={0}
          aria-label="Remove Chip"
        >
          ×
        </span>
      )}
    </button>
  );
};

export default Chip;