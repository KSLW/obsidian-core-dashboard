import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useModules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getModules();
      setModules(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load modules");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleModule = async (id) => {
    try {
      const updated = await apiClient.toggleModule(id);

      setModules((prev) =>
        prev.map((m) => (m.id === id ? updated.module : m))
      );

      return updated.module;
    } catch (err) {
      setError(err.message || "Failed to toggle module");
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { modules, loading, error, refresh, toggleModule };
}
