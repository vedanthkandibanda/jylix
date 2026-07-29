import styles from "./Tooltip.module.css";

const Tooltip = ({
  children,
  content,
  position = "top",
  className = "",
}) => {
  const classes = [
    styles.tooltip,
    styles[position],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={styles.trigger}>
        {children}
      </div>

      <div
        className={styles.content}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;