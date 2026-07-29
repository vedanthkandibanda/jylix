import styles from "./BaseCard.module.css";

const BaseCard = ({
  children,
  className = "",
  as: Component = "div",
  hoverable = false,
  bordered = true,
  elevated = false,
  onClick,
  ...props
}) => {
  const classes = [
    styles.card,
    bordered && styles.bordered,
    hoverable && styles.hoverable,
    elevated && styles.elevated,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default BaseCard;