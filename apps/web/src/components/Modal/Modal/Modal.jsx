import { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = "medium",
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = "",
}) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose?.();
    }
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        className={`${styles.modal} ${styles[size]} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <header className={styles.header}>
          {title && (
            <h2
              id="modal-title"
              className={styles.title}
            >
              {title}
            </h2>
          )}

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Modal"
          >
            ✕
          </button>
        </header>

        <div className={styles.body}>
          {children}
        </div>

        {footer && (
          <footer className={styles.footer}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;