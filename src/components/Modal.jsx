import { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import styles from "../styles/modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer
}) {
  // ESC key closes modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Stop background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={`${styles.backdrop} ${isOpen ? styles.open : ""}`} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()} 
        >
          {title && <div className={styles.header}>{title}</div>}

          <div className={styles.body}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </ModalPortal>
  );
}
