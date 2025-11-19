import styles from "../styles/input.module.css";

export default function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}
