import React from "react";
import styles from "./ModuleCard.module.css";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function ModuleCard({ module, onToggle }) {
  const handleToggle = () => {
    onToggle(!module.enabled);
  };

  return (
    <div className={`${styles.card} ${module.enabled ? styles.enabled : styles.disabled}`}>
      <div className={styles.header}>
        <h3>{module.name}</h3>

        <button
          className={styles.toggleBtn}
          onClick={handleToggle}
          aria-label="Toggle Module"
        >
          {module.enabled ? (
            <ToggleRight size={20} className={styles.toggleIconEnabled} />
          ) : (
            <ToggleLeft size={20} className={styles.toggleIconDisabled} />
          )}
        </button>
      </div>

      {module.description && (
        <p className={styles.description}>{module.description}</p>
      )}

      <p className={styles.moduleId}>
        ID: <span>{module.id}</span>
      </p>
    </div>
  );
}
