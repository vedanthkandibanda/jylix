import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;