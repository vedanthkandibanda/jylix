import styles from "./NavItem.module.css";

const NavItem = ({
  label,
  href = "#",
  active = false,
  onClick,
  target = "_self",
  rel,
  className = "",
}) => {
  const classes = [
    styles.navItem,
    active ? styles.active : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      target={target}
      rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
};

export default NavItem;