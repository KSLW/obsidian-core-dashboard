import styles from "../styles/card.module.css";

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      {title && <div className={styles.header}><h3>{title}</h3></div>}
      {children}
    </div>
  );
}
