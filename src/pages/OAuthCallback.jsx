// src/pages/OAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styles from "./OAuthCallback.module.css";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    async function finish() {
      await refreshAuth();
      setTimeout(() => navigate("/dashboard"), 800);
    }
    finish();
  }, [refreshAuth, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Finishing Login…</h1>
        <p className={styles.text}>
          Connecting your account, please wait…
        </p>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}
