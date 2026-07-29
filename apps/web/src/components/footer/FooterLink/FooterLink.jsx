import styles from "./FooterLink.module.css";

const FooterLink = ({
  children,
  href = "#",
  target = "_self",
  rel,
  onClick,
  className = "",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
      onClick={onClick}
      className={`${styles.link} ${className}`.trim()}
    >
      {children}
    </a>
  );
};

export default FooterLink;