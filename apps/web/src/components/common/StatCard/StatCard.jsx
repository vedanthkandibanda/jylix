import styles from "./StatCard.module.css";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
}) => {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>

        {icon && (
          <span className={styles.icon}>
            {icon}
          </span>
        )}
      </div>

      <div className={styles.value}>
        {value}
      </div>

      {subtitle && (
        <div className={styles.subtitle}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;