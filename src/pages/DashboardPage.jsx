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
  const { auth, loading: authLoading, refreshAuth, logoutTwitch, logoutDiscord } = useAuth();

  const [backendOnline, setBackendOnline] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showCommandsSection, setShowCommandsSection] = useState(true);
  const [showEventsSection, setShowEventsSection] = useState(true);

  // Backend URL for OAuth redirects
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "https://obsidian-core-backend.onrender.com";

  // Discord bot invite link
  const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
  const handleConnectDiscord = () => {
  window.location.href = `${BACKEND_URL}/api/auth/discord/login`;
};


  // On page load: refresh backend data + auth state
  useEffect(() => {
    refreshModules();
    refreshCommands();
    refreshEvents();
    refreshSettings();

    // VERY IMPORTANT: refresh auth when user returns from Twitch OAuth
    refreshAuth();

    const ping = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`);
        setBackendOnline(res.ok);
      } catch {
        setBackendOnline(false);
      }
    };

    ping();
  }, [
    refreshModules,
    refreshCommands,
    refreshEvents,
    refreshSettings,
    refreshAuth,
    BACKEND_URL,
  ]);

  const handleConnectTwitch = () => {
    // Forces a full redirect outside React Router
    window.location.href = `${BACKEND_URL}/api/auth/twitch/login`;
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
    <span className={styles.muted}>Checking Twitch…</span>
  ) : auth?.twitch?.accessToken ? (
    <>
      <span className={styles.connected}>Connected ✓</span>
      <button
        className={styles.disconnectBtn}
        onClick={logoutTwitch}
      >
        Disconnect
      </button>
    </>
  ) : (
    <button
      className={styles.connectBtn}
      onClick={handleConnectTwitch}
    >
      Connect Twitch
    </button>
  )}

  <span className={styles.connectionLabel}>Discord:</span>

{auth?.discord?.accessToken ? (
  <>
    <span className={styles.connected}>Connected ✓</span>
    <button className={styles.disconnectBtn} onClick={logoutDiscord}>
      Disconnect
    </button>
  </>
) : (
  <button className={styles.connectBtn} onClick={handleConnectDiscord}>
    Connect Discord
  </button>
)}

</div>



      {/* SYSTEM STATS */}
      <div className={styles.sectionHeader}>
        <h2>System Stats</h2>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowStats((v) => !v)}
        >
          {showStats ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showStats && (
          <motion.div
            key="stats"
            className={styles.grid}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.card}>
              <Server size={28} className={styles.icon} />
              <h3>Backend Status</h3>
              <p className={backendOnline ? styles.online : styles.offline}>
                {backendOnline ? "Online" : "Offline"}
              </p>
            </div>

            <div className={styles.card}>
              <MessageSquare size={28} className={styles.icon} />
              <h3>Total Commands</h3>
              <p className={styles.number}>{commands.length}</p>
            </div>

            <div className={styles.card}>
              <Zap size={28} className={styles.icon} />
              <h3>Total Events</h3>
              <p className={styles.number}>{events.length}</p>
            </div>

            <div className={styles.card}>
              <Package size={28} className={styles.icon} />
              <h3>Active Modules</h3>
              <p className={styles.number}>
                {modules.filter((m) => m.enabled).length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Latest Commands */}
      <div className={styles.sectionHeader}>
        <h2>Latest Commands</h2>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowCommandsSection((v) => !v)}
        >
          {showCommandsSection ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {showCommandsSection && (
          <motion.div
            key="commandsSection"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.listCard}
          >
            <ul className={styles.list}>
              {commands.slice(0, 5).map((cmd) => (
                <li key={cmd._id}>
                  <span>{cmd.name}</span>
                  <span className={styles.muted}>{cmd.trigger}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Latest Events */}
      <div className={styles.sectionHeader}>
        <h2>Latest Events</h2>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowEventsSection((v) => !v)}
        >
          {showEventsSection ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {showEventsSection && (
          <motion.div
            key="eventsSection"
            className={styles.listCard}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className={styles.list}>
              {events.slice(0, 5).map((evt) => (
                <li key={evt._id}>
                  <span>{evt.type}</span>
                  <span className={styles.muted}>{evt.message}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
