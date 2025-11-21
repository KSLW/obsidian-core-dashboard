import React, { useState, useEffect } from "react";
import useSettings from "../hooks/useSettings";
import SettingsForm from "../components/SettingsForm";
import styles from "./SettingsPage.module.css";
import useAuth from "../hooks/useAuth";
import apiClient from "../api/apiClient"; // ⭐ needed for saving Twitch keys

export default function SettingsPage() {
  const { settings, loading, error, updateSettings } = useSettings();
  const {
    auth,
    loading: authLoading,
    logoutTwitch,
    logoutDiscord,
  } = useAuth();

  // ⭐ Local state for Twitch keys
  const [twitchClientId, setTwitchClientId] = useState("");
  const [twitchClientSecret, setTwitchClientSecret] = useState("");
  const [savingTwitch, setSavingTwitch] = useState(false);
  const [twitchMsg, setTwitchMsg] = useState(null);

  // Load Twitch keys into UI when settings load
  useEffect(() => {
    if (settings) {
      setTwitchClientId(settings.twitchClientId || "");
      setTwitchClientSecret(settings.twitchClientSecret || "");
    }
  }, [settings]);

  // ⭐ Handler: Save Twitch Client ID + Secret
  const handleSaveTwitchKeys = async (e) => {
    e.preventDefault();
    setSavingTwitch(true);
    setTwitchMsg(null);

    try {
      await apiClient.saveTwitchKeys({
        twitchClientId,
        twitchClientSecret,
      });
      setTwitchMsg("Twitch App Keys saved successfully!");
    } catch (err) {
      setTwitchMsg("Failed to save Twitch keys.");
      console.error(err);
    }

    setSavingTwitch(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      {loading && <p className={styles.loading}>Loading settings…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* EXISTING GENERAL SETTINGS FORM */}
      {settings && (
        <SettingsForm settings={settings} onSave={updateSettings} />
      )}

      {/* ------------------------------ */}
      {/* EXISTING AUTH SECTION */}
      {/* ------------------------------ */}

      <div className={styles.authSection}>
        <h2>Authentication</h2>

        {/* Twitch */}
        <div className={styles.authRow}>
          <strong>Twitch:</strong>
          {auth?.twitch?.accessToken ? (
            <>
              <span className={styles.connected}>Connected</span>
              <button
                className={styles.disconnectBtn}
                onClick={logoutTwitch}
              >
                Disconnect
              </button>
            </>
          ) : (
            <a href="/api/auth/twitch/login" className={styles.connectBtn}>
              Connect Twitch
            </a>
          )}
        </div>

        {/* Discord */}
        <div className={styles.authRow}>
          <strong>Discord:</strong>
          {auth?.discord?.accessToken ? (
            <>
              <span className={styles.connected}>Connected</span>
              <button
                className={styles.disconnectBtn}
                onClick={logoutDiscord}
              >
                Disconnect
              </button>
            </>
          ) : (
            <a href="/api/auth/discord/login" className={styles.connectBtn}>
              Connect Discord
            </a>
          )}
        </div>

        <div className={styles.section}>
  <h2>Discord App Settings</h2>

  <label>
    Client ID
    <input
      type="text"
      value={settings.discordClientId || ""}
      onChange={(e) => handleChange("discordClientId", e.target.value)}
    />
  </label>

  <label>
    Client Secret
    <input
      type="password"
      value={settings.discordClientSecret || ""}
      onChange={(e) => handleChange("discordClientSecret", e.target.value)}
    />
  </label>
</div>

      </div>
    </div>
  );
}
