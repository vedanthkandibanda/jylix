import styles from "./FooterSection.module.css";

const FooterSection = ({
  title,
  children,
  className = "",
}) => {
  return (
    <section className={`${styles.section} ${className}`.trim()}>
      {title && (
        <h3 className={styles.title}>
          {title}
        </h3>
      )}

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};

export default FooterSection;