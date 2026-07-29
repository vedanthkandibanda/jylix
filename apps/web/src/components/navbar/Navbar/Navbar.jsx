import styles from "./Navbar.module.css";

const Navbar = ({
  logo,
  items,
  actions,
  mobileMenuButton,
  className = "",
}) => {
  return (
    <header className={`${styles.navbar} ${className}`.trim()}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {logo}
        </div>

        <nav
          className={styles.navigation}
          aria-label="Primary Navigation"
        >
          {items}
        </nav>

        <div className={styles.actions}>
          {actions}
        </div>

        <div className={styles.mobileToggle}>
          {mobileMenuButton}
        </div>
      </div>
    </header>
  );
};

export default Navbar;