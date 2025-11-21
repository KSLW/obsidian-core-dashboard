import React, { useState } from "react";
import styles from "./SettingsForm.module.css";
import { applyTheme } from "../theme/themes";

export default function SettingsForm({ settings, onSave }) {
  const [saving, setSaving] = useState(false);

  // GENERAL
  const [prefix, setPrefix] = useState(settings.prefix || "!");
  const [announcementsEnabled, setAnnouncementsEnabled] = useState(
    settings.announcementsEnabled ?? true
  );
  const [aiResponses, setAiResponses] = useState(
    settings.aiResponses ?? false
  );

  // TWITCH
  const [twitchUsername, setTwitchUsername] = useState(
    settings.twitch?.username || ""
  );
  const [twitchChannel, setTwitchChannel] = useState(
    settings.twitch?.channel || ""
  );

  // DISCORD
  const [discordBotEnabled, setDiscordBotEnabled] = useState(
    settings.discord?.botEnabled ?? false
  );

  // THEME
  const [theme, setTheme] = useState(settings.theme || "dark");

  const [customTheme, setCustomTheme] = useState({
    primary: settings.customTheme?.primary || "#8e7cff",
    secondary: settings.customTheme?.secondary || "#7d6cff",
    background: settings.customTheme?.background || "#1a1a1a",
    text: settings.customTheme?.text || "#e8e8e8",
  });

  const updateColor = (field, value) => {
    const next = { ...customTheme, [field]: value };
    setCustomTheme(next);

    // live preview
    if (theme === "custom") {
      applyTheme("custom", next);
    }
  };

  const resetCustomColors = () => {
    const defaults = {
      primary: "#8e7cff",
      secondary: "#7d6cff",
      background: "#1a1a1a",
      text: "#e8e8e8",
    };
    setCustomTheme(defaults);
    if (theme === "custom") applyTheme("custom", defaults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      prefix,
      announcementsEnabled,
      aiResponses,
      twitch: { username: twitchUsername, channel: twitchChannel },
      discord: { botEnabled: discordBotEnabled },
      theme,
      customTheme,
    };

    await onSave(payload);

    applyTheme(theme, customTheme);
    setSaving(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {/* GENERAL */}
      <div className={styles.section}>
        <h2>General</h2>

        <label>Command Prefix</label>
        <input
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          required
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={announcementsEnabled}
            onChange={(e) => setAnnouncementsEnabled(e.target.checked)}
          />
          Enable Announcements
        </label>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={aiResponses}
            onChange={(e) => setAiResponses(e.target.checked)}
          />
          Enable AI Responses
        </label>
      </div>

      {/* TWITCH */}
      <div className={styles.section}>
        <h2>Twitch</h2>

        <label>Bot Username</label>
        <input
          value={twitchUsername}
          onChange={(e) => setTwitchUsername(e.target.value)}
        />

        <label>Channel</label>
        <input
          value={twitchChannel}
          onChange={(e) => setTwitchChannel(e.target.value)}
        />
      </div>

      {/* DISCORD */}
      <div className={styles.section}>
        <h2>Discord</h2>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={discordBotEnabled}
            onChange={(e) => setDiscordBotEnabled(e.target.checked)}
          />
          Enable Discord Bot
        </label>
      </div>

      {/* THEME */}
      <div className={styles.section}>
        <h2>Theme</h2>

        <label>Theme Mode</label>
        <select
          className={styles.select}
          value={theme}
          onChange={(e) => {
            const next = e.target.value;
            setTheme(next);
            if (next !== "custom") applyTheme(next);
            else applyTheme("custom", customTheme);
          }}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="custom">Custom</option>
        </select>

        {theme === "custom" && (
          <div className={styles.colorGrid}>

            <div className={styles.colorItem}>
              <label>Primary</label>
              <input
                type="color"
                value={customTheme.primary}
                onChange={(e) => updateColor("primary", e.target.value)}
              />
            </div>

            <div className={styles.colorItem}>
              <label>Secondary</label>
              <input
                type="color"
                value={customTheme.secondary}
                onChange={(e) => updateColor("secondary", e.target.value)}
              />
            </div>

            <div className={styles.colorItem}>
              <label>Background</label>
              <input
                type="color"
                value={customTheme.background}
                onChange={(e) => updateColor("background", e.target.value)}
              />
            </div>

            <div className={styles.colorItem}>
              <label>Text</label>
              <input
                type="color"
                value={customTheme.text}
                onChange={(e) => updateColor("text", e.target.value)}
              />
            </div>

            <button
              className={styles.resetBtn}
              onClick={resetCustomColors}
              type="button"
            >
              Reset to Defaults
            </button>
          </div>
        )}
      </div>

      <button className={styles.saveBtn} type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
