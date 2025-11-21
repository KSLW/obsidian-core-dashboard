import React from "react";
import styles from "./Switch.module.css";

export default function Switch({ checked, onChange, label }) {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span className={styles.track}>
        <span className={styles.thumb}></span>
      </span>

      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
}
