// src/theme/themes.js
export const THEMES = {
  dark: {
    "--color-bg": "#1a1a1a",
    "--color-bg-light": "#222",
    "--color-bg-card": "#2a2a2a",
    "--color-text": "#e8e8e8",
    "--color-text-muted": "#b3b3b3",
    "--color-accent": "#8e7cff",
    "--color-accent-hover": "#7d6cff",
    "--color-border": "#333",
    "--input-bg": "#242424",
    "--input-border": "#3a3a3a",
    "--input-focus": "#8e7cff"
  },
  light: {
    "--color-bg": "#f7f7f7",
    "--color-bg-light": "#ffffff",
    "--color-bg-card": "#ffffff",
    "--color-text": "#222",
    "--color-text-muted": "#666",
    "--color-accent": "#8e7cff",
    "--color-accent-hover": "#7d6cff",
    "--color-border": "#ddd",
    "--input-bg": "#ffffff",
    "--input-border": "#ccc",
    "--input-focus": "#8e7cff"
  },
  purple: {
    "--color-bg": "#130f1f",
    "--color-bg-light": "#1b1530",
    "--color-bg-card": "#231a3b",
    "--color-text": "#f4eefe",
    "--color-text-muted": "#c3b5f3",
    "--color-accent": "#b388ff",
    "--color-accent-hover": "#a273ff",
    "--color-border": "#3b2a5e",
    "--input-bg": "#1e1733",
    "--input-border": "#3b2a5e",
    "--input-focus": "#b388ff"
  },
  blue: {
    "--color-bg": "#020818",
    "--color-bg-light": "#050b1f",
    "--color-bg-card": "#0a1128",
    "--color-text": "#e6f1ff",
    "--color-text-muted": "#9fb3d9",
    "--color-accent": "#3b82f6",
    "--color-accent-hover": "#2563eb",
    "--color-border": "#1f2937",
    "--input-bg": "#050b1f",
    "--input-border": "#1f2937",
    "--input-focus": "#3b82f6"
  },
  "high-contrast": {
    "--color-bg": "#000000",
    "--color-bg-light": "#000000",
    "--color-bg-card": "#000000",
    "--color-text": "#ffffff",
    "--color-text-muted": "#f5f5f5",
    "--color-accent": "#ffcc00",
    "--color-accent-hover": "#ffb700",
    "--color-border": "#ffffff",
    "--input-bg": "#000000",
    "--input-border": "#ffffff",
    "--input-focus": "#ffcc00"
  }
};

export function applyTheme(themeKey, customTheme) {
  const root = document.documentElement;
  let themeVars;

  if (themeKey === "custom" && customTheme) {
    themeVars = {
      "--color-bg": customTheme.background || "#1a1a1a",
      "--color-bg-light": customTheme.background || "#1f1f1f",
      "--color-bg-card": customTheme.background || "#242424",
      "--color-text": customTheme.text || "#ffffff",
      "--color-text-muted": customTheme.text || "#cccccc",
      "--color-accent": customTheme.primary || "#8e7cff",
      "--color-accent-hover": customTheme.secondary || customTheme.primary || "#7d6cff",
      "--color-border": customTheme.secondary || "#333",
      "--input-bg": customTheme.background || "#242424",
      "--input-border": customTheme.secondary || "#3a3a3a",
      "--input-focus": customTheme.primary || "#8e7cff"
    };
  } else {
    themeVars = THEMES[themeKey] || THEMES.dark;
  }

  Object.entries(themeVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
