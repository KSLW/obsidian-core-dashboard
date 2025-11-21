import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = async (id, payload) => {
    try {
      setLoading(true);
      const updated = await apiClient.updateEvent(id, payload);

      setEvents((prev) =>
        prev.map((e) => (e._id === id ? updated : e))
      );

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update event");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { events, loading, error, refresh, updateEvent };
}
