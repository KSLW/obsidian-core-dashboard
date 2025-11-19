import styles from "../styles/tabs.module.css";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${active === tab ? styles.active : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
