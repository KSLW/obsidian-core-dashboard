import React from "react";
import  useEvents  from "../hooks/useEvents";
import EventEditor from "../components/EventEditor";
import styles from "./EventsPage.module.css";

export default function EventsPage() {
  const { events, loading, error, updateEvent } = useEvents();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Events</h1>

      {loading && <p className={styles.loading}>Loading events…</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.eventsList}>
        {events.map((evt) => (
          <EventEditor
            key={evt._id}
            event={evt}
            onSave={(payload) => updateEvent(evt._id, payload)}
          />
        ))}
      </div>
    </div>
  );
}
