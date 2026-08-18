import styles from "./Input.module.css";

const Input = ({
  label,
  error,
  helperText,
  className = "",
  id,
  type = "text",
  ...props
}) => {
  const classes = [
    styles.input,
    error ? styles.error : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={classes}
        {...props}
      />

      {error && (
        <span className={styles.errorMessage}>
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className={styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;