import styles from "../styles/input.module.css";

export default function Textarea({ label, ...props }) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={`${styles.input} ${styles.textarea}`} {...props} />
    </div>
  );
}
