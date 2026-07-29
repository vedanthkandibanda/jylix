import Modal from "../../modal/Modal";
import Button from "../../buttons/Button";

import styles from "./Dialog.module.css";

const Dialog = ({
  isOpen = false,
  title = "",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  cancelVariant = "secondary",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const footer = (
    <div className={styles.actions}>
      <Button
        variant={cancelVariant}
        onClick={onCancel}
        disabled={loading}
      >
        {cancelText}
      </Button>

      <Button
        variant={confirmVariant}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? "Please wait..." : confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      footer={footer}
      size="small"
    >
      <p className={styles.message}>
        {message}
      </p>
    </Modal>
  );
};

export default Dialog;