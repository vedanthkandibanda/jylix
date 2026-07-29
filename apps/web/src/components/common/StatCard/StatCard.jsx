import styles from "./StatCard.module.css";

const StatCard = ({
  label,
  value,
  icon,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`${styles.card} ${className}`}
    >
      {icon && (
        <div className={styles.icon}>
          {icon}
        </div>
      )}

      <span className={styles.label}>
        {label}
      </span>

      <strong className={styles.value}>
        {value}
      </strong>

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatCard;