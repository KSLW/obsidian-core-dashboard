import React, { useEffect, useState } from "react";
import styles from "./StatusBar.module.css";
import { RefreshCcw, Circle } from "lucide-react";
import  useModules  from "../hooks/useModules";
import  useSettings  from "../hooks/useSettings";

export default function StatusBar() {
  const [backendOnline, setBackendOnline] = useState(false);
  const { refresh } = useModules();
  const { settings } = useSettings();

  useEffect(() => {
    let active = true;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/health");
        if (!active) return;
        setBackendOnline(res.ok);
      } catch {
        if (!active) return;
        setBackendOnline(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <Circle
          size={12}
          className={backendOnline ? styles.online : styles.offline}
        />

        <span className={styles.label}>
          {backendOnline ? "Backend Online" : "Backend Offline"}
        </span>

        {settings?.twitch?.channel && (
          <span className={styles.item}>
            Twitch: <strong>{settings.twitch.channel}</strong>
          </span>
        )}
      </div>

      <div className={styles.right}>
        <button
          className={styles.actionBtn}
          onClick={refresh}
          aria-label="Reload Modules"
        >
          <RefreshCcw size={14} />
          <span>Reload Modules</span>
        </button>
      </div>
    </div>
  );
}
