import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

const NavItem = ({ to, icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          styles.navItem,
          isActive ? styles.active : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {icon && <span className={styles.icon}>{icon}</span>}

      <span className={styles.label}>
        {children}
      </span>
    </NavLink>
  );
};

export default NavItem;