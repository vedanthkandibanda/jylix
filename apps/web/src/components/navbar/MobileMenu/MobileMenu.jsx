import { useEffect } from "react";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({
  isOpen = false,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={styles.menu}
        aria-label="Mobile Navigation"
      >
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <nav className={styles.navigation}>
          {children}
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;