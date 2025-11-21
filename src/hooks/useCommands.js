import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useCommands() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getCommands();
      setCommands(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load commands");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCommand = async (payload) => {
    try {
      setLoading(true);
      const newCmd = await apiClient.createCommand(payload);
      setCommands((prev) => [...prev, newCmd]);
      return newCmd;
    } catch (err) {
      setError(err.message || "Failed to create command");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCommand = async (id, payload) => {
    try {
      setLoading(true);
      const updated = await apiClient.updateCommand(id, payload);

      setCommands((prev) =>
        prev.map((c) => (c._id === id ? updated : c))
      );

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update command");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCommand = async (id) => {
    try {
      setLoading(true);
      await apiClient.deleteCommand(id);
      setCommands((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete command");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    commands,
    loading,
    error,
    refresh,
    createCommand,
    updateCommand,
    deleteCommand,
  };
}
