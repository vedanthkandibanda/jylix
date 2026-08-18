import styles from "./Badge.module.css";

const Badge = ({
  children,
  variant = "neutral",
  size = "medium",
  className = "",
}) => {
  const classes = [
    styles.badge,
    styles[variant],
    size === "small" ? styles.small : "",
    size === "large" ? styles.large : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;