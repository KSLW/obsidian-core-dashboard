import styles from "../styles/pageHeader.module.css";

export default function PageHeader({ title, description, actions }) {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.desc}>{description}</div>}
      </div>

      {actions && <div>{actions}</div>}
    </div>
  );
}
