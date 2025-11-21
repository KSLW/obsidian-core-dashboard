// src/api/apiClient.js
import axios from "axios";

// Backend URL (from .env or fallback)
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// Create unified axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" }
});

// Generic wrapper for .data extraction
const unwrap = (promise) => promise.then((res) => res.data);

// ============================================================================
// COMMANDS
// ============================================================================
const getCommands = () => unwrap(api.get("/api/commands"));
const createCommand = (payload) => unwrap(api.post("/api/commands", payload));
const updateCommand = (id, payload) =>
  unwrap(api.put(`/api/commands/${id}`, payload));
const deleteCommand = (id) => unwrap(api.delete(`/api/commands/${id}`));

// ============================================================================
// EVENTS
// ============================================================================
const getEvents = () => unwrap(api.get("/api/events"));
const updateEvent = (id, payload) =>
  unwrap(api.put(`/api/events/${id}`, payload));

// ============================================================================
// SETTINGS
// ============================================================================
const getSettings = () => unwrap(api.get("/api/settings"));
const updateSettings = (payload) =>
  unwrap(api.put("/api/settings", payload));

// ============================================================================
// AUTH + OAUTH PROVIDERS (Twitch, Discord, etc.)
// ============================================================================

// Save Twitch Client ID / Secret
const saveTwitchKeys = ({ twitchClientId, twitchClientSecret }) =>
  unwrap(
    api.post("/api/auth/twitch/keys", {
      twitchClientId,
      twitchClientSecret
    })
  );

// Reset auth tokens (twitch / discord)
const resetAuth = (provider) =>
  unwrap(api.post(`/api/auth/reset/${provider}`));

// ============================================================================
// EXPORT UNIFIED CLIENT
// ============================================================================
const apiClient = {
  // Commands
  getCommands,
  createCommand,
  updateCommand,
  deleteCommand,

  // Events
  getEvents,
  updateEvent,

  // Settings
  getSettings,
  updateSettings,

  // Twitch OAuth / Keys
  saveTwitchKeys,
  resetAuth
};

export default apiClient;
