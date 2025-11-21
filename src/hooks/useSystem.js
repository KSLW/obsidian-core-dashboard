import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useSystem() {
  const [system, setSystem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getSystem();
      setSystem(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load system info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { system, loading, error, refresh };
}
