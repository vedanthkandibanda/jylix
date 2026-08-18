import NavItem from "../NavItem/NavItem";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>J</span>
        <span className={styles.logoText}>YLIX</span>
      </div>

      <div className={styles.navigation}>
        <NavItem to="/dashboard" icon="⌂">
          Dashboard
        </NavItem>

        <NavItem to="/workout" icon="◉">
          Workout
        </NavItem>

        <NavItem to="/nutrition" icon="◆">
          Nutrition
        </NavItem>

        <NavItem to="/progress" icon="↗">
          Progress
        </NavItem>

        <NavItem to="/ai-coach" icon="✦">
          AI Coach
        </NavItem>

        <NavItem to="/missions" icon="◇">
          Missions
        </NavItem>
      </div>

      <div className={styles.bottom}>
        <NavItem to="/settings" icon="⚙">
          Settings
        </NavItem>
      </div>
    </nav>
  );
};

export default Navbar;