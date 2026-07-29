import styles from "./Footer.module.css";

const Footer = ({
  logo,
  sections,
  socialLinks,
  copyright,
  className = "",
}) => {
  return (
    <footer className={`${styles.footer} ${className}`.trim()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {logo}
          </div>

          <div className={styles.sections}>
            {sections}
          </div>
        </div>

        {socialLinks && (
          <div className={styles.social}>
            {socialLinks}
          </div>
        )}

        <div className={styles.bottom}>
          {copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;