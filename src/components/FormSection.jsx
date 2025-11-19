import styles from "../styles/form.module.css";

export default function FormSection({ title, description, children }) {
  return (
    <div className={styles.formGroup}>
      {title && <div className={styles.formSectionTitle}>{title}</div>}
      {description && <div className={styles.formSectionDesc}>{description}</div>}
      {children}
    </div>
  );
}
