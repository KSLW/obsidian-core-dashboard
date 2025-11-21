// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export default function useAuth() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getSettings();
      setAuth({
        twitch: data.twitchAuth,
        discord: data.discordAuth,
      });
    } catch (err) {
      console.error("Failed to load auth", err);
    }
    setLoading(false);
  };

  const logoutTwitch = async () => {
    await apiClient.resetAuth("twitch");
    refreshAuth();
  };

  const logoutDiscord = async () => {
    await apiClient.resetAuth("discord");
    refreshAuth();
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return {
    auth,
    loading,
    refreshAuth,
    logoutTwitch,
    logoutDiscord,
  };
}
