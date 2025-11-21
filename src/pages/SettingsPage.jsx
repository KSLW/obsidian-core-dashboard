import React, { useState, useEffect } from "react";
import useSettings from "../hooks/useSettings";
import SettingsForm from "../components/SettingsForm";
import styles from "./SettingsPage.module.css";
import useAuth from "../hooks/useAuth";
import apiClient from "../api/apiClient";

export default function SettingsPage() {
  const { settings, loading, error, updateSettings } = useSettings();
  const {
    auth,
    loading: authLoading,
    logoutTwitch,
    logoutDiscord,
  } = useAuth();

  // -------------------------------
  // ⭐ TWITCH LOCAL STATE
  // -------------------------------
  const [twitchClientId, setTwitchClientId] = useState("");
  const [twitchClientSecret, setTwitchClientSecret] = useState("");
  const [savingTwitch, setSavingTwitch] = useState(false);
  const [twitchMsg, setTwitchMsg] = useState(null);

  // -------------------------------
  // ⭐ DISCORD LOCAL STATE
  // -------------------------------
  const [discordClientId, setDiscordClientId] = useState("");
  const [discordClientSecret, setDiscordClientSecret] = useState("");
  const [savingDiscord, setSavingDiscord] = useState(false);
  const [discordMsg, setDiscordMsg] = useState(null);

  // -------------------------------
  // Load settings into local state
  // -------------------------------
  useEffect(() => {
    if (settings) {
      // Twitch
      setTwitchClientId(settings.twitchClientId || "");
      setTwitchClientSecret(settings.twitchClientSecret || "");

      // Discord
      setDiscordClientId(settings.discordClientId || "");
      setDiscordClientSecret(settings.discordClientSecret || "");
    }
  }, [settings]);

  // -------------------------------
  // SAVE TWITCH KEYS
  // -------------------------------
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

  // -------------------------------
  // SAVE DISCORD KEYS
  // -------------------------------
  const handleSaveDiscordKeys = async (e) => {
    e.preventDefault();
    setSavingDiscord(true);
    setDiscordMsg(null);

    try {
      await apiClient.saveDiscordKeys({
        discordClientId,
        discordClientSecret,
      });
      setDiscordMsg("Discord App Keys saved successfully!");
    } catch (err) {
      setDiscordMsg("Failed to save Discord keys.");
      console.error(err);
    }

    setSavingDiscord(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      {loading && <p className={styles.loading}>Loading settings…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* GENERAL SETTINGS FORM (EXISTING) */}
      {settings && (
        <SettingsForm settings={settings} onSave={updateSettings} />
      )}

      {/* ------------------------------ */}
      {/* AUTH SECTION */}
      {/* ------------------------------ */}
      <div className={styles.authSection}>
        <h2>Authentication</h2>

        {/* TWITCH */}
        <div className={styles.authRow}>
          <strong>Twitch:</strong>
          {auth?.twitch?.accessToken ? (
            <>
              <span className={styles.connected}>Connected</span>
              <button className={styles.disconnectBtn} onClick={logoutTwitch}>
                Disconnect
              </button>
            </>
          ) : (
            <a href="/api/auth/twitch/login" className={styles.connectBtn}>
              Connect Twitch
            </a>
          )}
        </div>

        {/* DISCORD */}
        <div className={styles.authRow}>
          <strong>Discord:</strong>
          {auth?.discord?.accessToken ? (
            <>
              <span className={styles.connected}>Connected</span>
              <button className={styles.disconnectBtn} onClick={logoutDiscord}>
                Disconnect
              </button>
            </>
          ) : (
            <a href="/api/auth/discord/login" className={styles.connectBtn}>
              Connect Discord
            </a>
          )}
        </div>

        {/* ------------------------------ */}
        {/* DISCORD APP SETTINGS */}
        {/* ------------------------------ */}

        <h2>Discord App Settings</h2>

        <form onSubmit={handleSaveDiscordKeys} className={styles.section}>
          <label>
            Client ID
            <input
              type="text"
              value={discordClientId}
              onChange={(e) => setDiscordClientId(e.target.value)}
            />
          </label>

          <label>
            Client Secret
            <input
              type="password"
              value={discordClientSecret}
              onChange={(e) => setDiscordClientSecret(e.target.value)}
            />
          </label>

          <button type="submit" className={styles.saveBtn} disabled={savingDiscord}>
            {savingDiscord ? "Saving…" : "Save Discord Keys"}
          </button>

          {discordMsg && <p>{discordMsg}</p>}
        </form>
      </div>

      {/* ------------------------------ */}
      {/* TWITCH APP SETTINGS */}
      {/* ------------------------------ */}
      <h2>Twitch App Settings</h2>

      <form onSubmit={handleSaveTwitchKeys} className={styles.section}>
        <label>
          Client ID
          <input
            type="text"
            value={twitchClientId}
            onChange={(e) => setTwitchClientId(e.target.value)}
          />
        </label>

        <label>
          Client Secret
          <input
            type="password"
            value={twitchClientSecret}
            onChange={(e) => setTwitchClientSecret(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.saveBtn} disabled={savingTwitch}>
          {savingTwitch ? "Saving…" : "Save Twitch Keys"}
        </button>

        {twitchMsg && <p>{twitchMsg}</p>}
      </form>
    </div>
  );
}
