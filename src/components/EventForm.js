import React, { useState } from "react";
import styles from "./EventEditor.module.css";

export default function EventEditor({ event, onSave }) {
  const [message, setMessage] = useState(event.message || "");
  const [enabled, setEnabled] = useState(event.enabled);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await onSave({
      message: message.trim(),
      enabled,
    });

    setSaving(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{event.type}</h3>

        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enabled
        </label>
      </div>

      <form className={styles.editor} onSubmit={submit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Event response message…"
        />

        <button
          className={styles.saveBtn}
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
