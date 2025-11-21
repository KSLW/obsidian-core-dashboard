import React, { useState } from "react";
import styles from "./CommandForm.module.css";

export default function CommandForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !response.trim()) {
      return;
    }

    setLoading(true);

    await onSubmit({
      name: name.trim(),
      response: response.trim(),
      cooldown: Number(cooldown) || 0,
      enabled: true,
    });

    setName("");
    setResponse("");
    setCooldown(0);
    setLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>Create New Command</h2>

      <div className={styles.group}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="hello"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.group}>
        <label>Response</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Hi chat!"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.group}>
        <label>Cooldown (seconds)</label>
        <input
          type="number"
          min="0"
          value={cooldown}
          onChange={(e) => setCooldown(e.target.value)}
          disabled={loading}
        />
      </div>

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Command"}
      </button>
    </form>
  );
}
