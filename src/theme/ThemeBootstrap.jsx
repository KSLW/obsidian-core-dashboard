import React, { useEffect } from "react";
import  useSettings  from "../hooks/useSettings";

// Built-in theme presets
const BUILT_IN_THEMES = {
  dark: {
    "--color-bg": "#0f0f0f",
    "--color-bg-light": "#181818",
    "--color-bg-card": "#1f1f1f",
    "--color-border": "#2a2a2a",
    "--color-text": "#e9e9e9",
    "--color-text-muted": "#a3a3a3",
    "--color-accent": "#8e7cff",
  },

  light: {
    "--color-bg": "#f2f2f2",
    "--color-bg-light": "#ffffff",
    "--color-bg-card": "#ffffff",
    "--color-border": "#dddddd",
    "--color-text": "#222222",
    "--color-text-muted": "#666666",
    "--color-accent": "#7b61ff",
  },

  purple: {
    "--color-bg": "#151019",
    "--color-bg-light": "#1e1525",
    "--color-bg-card": "#261a33",
    "--color-border": "#3a2a4d",
    "--color-text": "#f0e9ff",
    "--color-text-muted": "#bea8d7",
    "--color-accent": "#a57bff",
  },

  neon: {
    "--color-bg": "#0b0f1a",
    "--color-bg-light": "#0f1422",
    "--color-bg-card": "#10182b",
    "--color-border": "#233454",
    "--color-text": "#dff3ff",
    "--color-text-muted": "#9fc4e6",
    "--color-accent": "#4dc3ff",
  },

  contrast: {
    "--color-bg": "#000000",
    "--color-bg-light": "#0a0a0a",
    "--color-bg-card": "#111111",
    "--color-border": "#ffffff",
    "--color-text": "#ffffff",
    "--color-text-muted": "#cccccc",
    "--color-accent": "#ffcc00",
  },
};

export default function ThemeBootstrap({ children }) {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings) return;

    const themeName = settings.theme || "dark";
    const root = document.documentElement;

    // Apply built-in theme
    if (BUILT_IN_THEMES[themeName]) {
      const vars = BUILT_IN_THEMES[themeName];
      for (const key in vars) {
        root.style.setProperty(key, vars[key]);
      }
    }

    // Apply custom theme overrides
    if (themeName === "custom" && settings.customTheme) {
      const custom = settings.customTheme;

      if (custom.primary)
        root.style.setProperty("--color-accent", custom.primary);

      if (custom.background)
        root.style.setProperty("--color-bg", custom.background);

      if (custom.text)
        root.style.setProperty("--color-text", custom.text);
    }
  }, [settings]);

  return <>{children}</>;
}
