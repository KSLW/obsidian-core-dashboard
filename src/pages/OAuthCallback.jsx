// src/pages/OAuthCallback.jsx
import React, { useEffect } from "react";
import styles from "./OAuthCallback.module.css";

export default function OAuthCallback() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to Dashboard after a moment
      window.location.href = "/dashboard";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.loader}></div>
        <p className={styles.text}>Completing OAuth…</p>
      </div>
    </div>
  );
}
