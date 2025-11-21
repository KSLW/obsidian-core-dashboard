import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import styles from "./TwitchAppSettings.module.css"; // you can create or swap to existing

export default function TwitchAppSettings() {
  const [twitchClientId, setTwitchClientId] = useState("");
  const [twitchClientSecret, setTwitchClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const settings = await apiClient.getSettings();
        if (!isMounted) return;
        setTwitchClientId(settings.twitchClientId || "");
        setTwitchClientSecret(settings.twitchClientSecret || "");
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load current Twitch keys.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await apiClient.saveTwitchKeys({ twitchClientId, twitchClientSecret });
      setMessage("Twitch keys saved successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to save Twitch keys.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading Twitch app settings…</p>;
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Twitch App Settings</h2>
      <p className={styles.helpText}>
        Paste your <strong>Twitch Client ID</strong> and <strong>Twitch Client Secret</strong>{" "}
        from your Twitch Developer Console. These are used for OAuth per streamer.
      </p>

      <form onSubmit={handleSave} className={styles.form}>
        <label className={styles.label}>
          Client ID
          <input
            className={styles.input}
            type="text"
            value={twitchClientId}
            onChange={(e) => setTwitchClientId(e.target.value)}
            placeholder="e.g. abcd1234abcd1234abcd1234"
          />
        </label>

        <label className={styles.label}>
          Client Secret
          <input
            className={styles.input}
            type="password"
            value={twitchClientSecret}
            onChange={(e) => setTwitchClientSecret(e.target.value)}
            placeholder="••••••••••••••••"
          />
        </label>

        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? "Saving..." : "Save Twitch Keys"}
        </button>
      </form>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
