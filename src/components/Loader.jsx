import React from "react";
import styles from "./Loader.module.css";

export default function Loader({ size = 28 }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
    ></div>
  );
}