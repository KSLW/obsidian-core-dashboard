// src/pages/SettingsPage.jsx
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

  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

  // Twitch app keys
  const [twitchClientId, setTwitchClientId] = useState("");
  const [twitchClientSecret, setTwitchClientSecret] = useState("");
  const [savingTwitch, setSavingTwitch] = useState(false);
  const [twitchMsg, setTwitchMsg] = useState(null);

  // Discord app keys
  const [discordClientId, setDiscordClientId] = useState("");
  const [discordClientSecret, setDiscordClientSecret] = useState("");
  const [savingDiscord, setSavingDiscord] = useState(false);
  const [discordMsg, setDiscordMsg] = useState(null);

  // Load keys from settings when they arrive
  useEffect(() => {
    if (!settings) return;

    setTwitchClientId(settings.twitchClientId || "");
    setTwitchClientSecret(settings.twitchClientSecret || "");

    setDiscordClientId(settings.discordClientId || "");
    setDiscordClientSecret(settings.discordClientSecret || "");
  }, [settings]);

  const handleSaveTwitchKeys = async (e) => {
    e.preventDefault();
    setSavingTwitch(true);
    setTwitchMsg(null);

    try {
      await apiClient.saveTwitchKeys({
        twitchClientId,
        twitchClientSecret,
      });
      setTwitchMsg("Twitch app keys saved successfully.");
    } catch (err) {
      console.error(err);
      setTwitchMsg("Failed to save Twitch keys.");
    } finally {
      setSavingTwitch(false);
    }
  };

  const handleSaveDiscordKeys = async (e) => {
    e.preventDefault();
    setSavingDiscord(true);
    setDiscordMsg(null);

    try {
      await apiClient.saveDiscordKeys({
        discordClientId,
        discordClientSecret,
      });
      setDiscordMsg("Discord app keys saved successfully.");
    } catch (err) {
      console.error(err);
      setDiscordMsg("Failed to save Discord keys.");
    } finally {
      setSavingDiscord(false);
    }
  };

  const handleConnectTwitch = () => {
    window.location.href = `${BACKEND_URL}/api/auth/twitch/login`;
  };

  const handleConnectDiscord = () => {
    window.location.href = `${BACKEND_URL}/api/auth/discord/login`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      {loading && <p className={styles.loading}>Loading settings…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* GENERAL SETTINGS (existing behaviour) */}
      {settings && (
        <SettingsForm settings={settings} onSave={updateSettings} />
      )}

      {/* AUTH STATUS */}
      <div className={styles.authSection}>
        <h2>Authentication</h2>

        {/* Twitch status */}
        <div className={styles.authRow}>
          <strong>Twitch:</strong>
          {authLoading ? (
            <span className={styles.muted}>Checking Twitch…</span>
          ) : auth?.twitch?.accessToken ? (
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
            <button
              className={styles.connectBtn}
              onClick={handleConnectTwitch}
            >
              Connect Twitch
            </button>
          )}
        </div>

        {/* Discord status */}
        <div className={styles.authRow}>
          <strong>Discord:</strong>
          {authLoading ? (
            <span className={styles.muted}>Checking Discord…</span>
          ) : auth?.discord?.accessToken ? (
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
            <button
              className={styles.connectBtn}
              onClick={handleConnectDiscord}
            >
              Connect Discord
            </button>
          )}
        </div>
      </div>

      {/* TWITCH APP SETTINGS */}
      <div className={styles.section}>
        <h2>Twitch App Settings</h2>
        <p className={styles.helpText}>
          Paste your Twitch <strong>Client ID</strong> and{" "}
          <strong>Client Secret</strong> from the Twitch Developer Console.
        </p>

        <form onSubmit={handleSaveTwitchKeys} className={styles.form}>
          <label className={styles.label}>
            Client ID
            <input
              className={styles.input}
              type="text"
              value={twitchClientId}
              onChange={(e) => setTwitchClientId(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Client Secret
            <input
              className={styles.input}
              type="password"
              value={twitchClientSecret}
              onChange={(e) => setTwitchClientSecret(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={savingTwitch}
          >
            {savingTwitch ? "Saving…" : "Save Twitch Keys"}
          </button>

          {twitchMsg && <p className={styles.info}>{twitchMsg}</p>}
        </form>
      </div>

      {/* DISCORD APP SETTINGS */}
      <div className={styles.section}>
        <h2>Discord App Settings</h2>
        <p className={styles.helpText}>
          Paste your Discord <strong>Client ID</strong> and{" "}
          <strong>Client Secret</strong> from the Discord Developer Portal.
        </p>

        <form onSubmit={handleSaveDiscordKeys} className={styles.form}>
          <label className={styles.label}>
            Client ID
            <input
              className={styles.input}
              type="text"
              value={discordClientId}
              onChange={(e) => setDiscordClientId(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Client Secret
            <input
              className={styles.input}
              type="password"
              value={discordClientSecret}
              onChange={(e) => setDiscordClientSecret(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={savingDiscord}
          >
            {savingDiscord ? "Saving…" : "Save Discord Keys"}
          </button>

          {discordMsg && <p className={styles.info}>{discordMsg}</p>}
        </form>
      </div>
    </div>
  );
}
