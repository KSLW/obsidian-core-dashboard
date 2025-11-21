import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getSettings();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = async (payload) => {
    try {
      setLoading(true);
      const updated = await apiClient.updateSettings(payload);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message || "Failed to update settings");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { settings, loading, error, refresh, updateSettings };
}
