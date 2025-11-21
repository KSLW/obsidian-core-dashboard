// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export default function useAuth() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const data = await apiClient.getSettings();
      setAuth({
        twitch: data.twitchAuth,
        discord: data.discordAuth,
      });
    } catch (err) {
      console.error("Failed to load auth", err);
      setAuth({ twitch: null, discord: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const logoutTwitch = async () => {
    setLoading(true);
    await apiClient.resetAuth("twitch");
    await refreshAuth();
  };

  const logoutDiscord = async () => {
    setLoading(true);
    await apiClient.resetAuth("discord");
    await refreshAuth();
  };

  return {
    auth,
    loading,
    refreshAuth,
    logoutTwitch,
    logoutDiscord,
  };
}
