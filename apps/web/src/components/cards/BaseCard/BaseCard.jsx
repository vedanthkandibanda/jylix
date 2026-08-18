import styles from "./BaseCard.module.css";

const BaseCard = ({
  children,
  className = "",
  interactive = false,
  active = false,
  elevated = false,
  size = "default",
  onClick,
  ...props
}) => {
  const classes = [
    styles.card,
    interactive ? styles.interactive : "",
    active ? styles.active : "",
    elevated ? styles.elevated : "",
    size !== "default" ? styles[size] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default BaseCard;