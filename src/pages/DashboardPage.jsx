// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import { motion, AnimatePresence } from "framer-motion";

import useModules from "../hooks/useModules";
import useCommands from "../hooks/useCommands";
import useEvents from "../hooks/useEvents";
import useSystem from "../hooks/useSystem";
import useSettings from "../hooks/useSettings";
import useAuth from "../hooks/useAuth";

import {
  Server,
  Package,
  Zap,
  MessageSquare,
  RefreshCcw,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export default function DashboardPage() {
  const { modules, refresh: refreshModules } = useModules();
  const { commands, refresh: refreshCommands } = useCommands();
  const { events, refresh: refreshEvents } = useEvents();
  const { restartBackend } = useSystem();
  const { refresh: refreshSettings } = useSettings();
  const { auth, loading: authLoading, logoutTwitch, logoutDiscord } = useAuth();

  const [backendOnline, setBackendOnline] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // Discord Invite Button
  const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;

  useEffect(() => {
    refreshModules();
    refreshCommands();
    refreshEvents();
    refreshSettings();

    const check = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`);
        setBackendOnline(res.ok);
      } catch {
        setBackendOnline(false);
      }
    };

    check();
  }, []);

  const connectTwitch = () => {
    window.location.href = `${BACKEND_URL}/api/auth/twitch/login`;
  };

  const connectDiscord = () => {
    window.location.href = `${BACKEND_URL}/api/auth/discord/login`;
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Dashboard</h1>

      {/* QUICK ACTIONS */}
      <div className={styles.actions}>
        <button onClick={refreshCommands} className={styles.actionBtn}>
          <RefreshCcw size={16} /> Reload Commands
        </button>

        <button onClick={refreshEvents} className={styles.actionBtn}>
          <RefreshCcw size={16} /> Reload Events
        </button>

        <button onClick={refreshModules} className={styles.actionBtn}>
          <RefreshCcw size={16} /> Reload Modules
        </button>

        <a href={inviteUrl} className={styles.connectBtn}>
          Add Discord Bot
        </a>

        <button onClick={restartBackend} className={styles.actionBtnDanger}>
          <RefreshCcw size={16} /> Restart Backend
        </button>
      </div>

      {/* CONNECTION STATUS */}
      <div className={styles.connectionRow}>
        <span className={styles.connectionLabel}>Twitch:</span>

        {authLoading ? (
          <span className={styles.muted}>Checking…</span>
        ) : auth?.twitch?.accessToken ? (
          <>
            <span className={styles.connected}>Connected ✓</span>
            <button className={styles.disconnectBtn} onClick={logoutTwitch}>
              Disconnect
            </button>
          </>
        ) : (
          <button className={styles.connectBtn} onClick={connectTwitch}>
            Connect Twitch
          </button>
        )}
      </div>

      <div className={styles.connectionRow}>
        <span className={styles.connectionLabel}>Discord:</span>

        {authLoading ? (
          <span className={styles.muted}>Checking…</span>
        ) : auth?.discord?.accessToken ? (
          <>
            <span className={styles.connected}>Connected ✓</span>
            <button className={styles.disconnectBtn} onClick={logoutDiscord}>
              Disconnect
            </button>
          </>
        ) : (
          <button className={styles.connectBtn} onClick={connectDiscord}>
            Connect Discord
          </button>
        )}
      </div>

      {/* --- System Stats / Commands / Events sections would follow --- */}
    </div>
  );
}
