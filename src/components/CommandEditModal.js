import React, { useState } from "react";
import styles from "./CommandEditModal.module.css";
import { motion } from "framer-motion";

export default function CommandEditModal({ command, onClose, onSave }) {
  const [name, setName] = useState(command.name);
  const [response, setResponse] = useState(command.response);
  const [cooldown, setCooldown] = useState(command.cooldown);
  const [enabled, setEnabled] = useState(command.enabled);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await onSave({
      name: name.trim(),
      response: response.trim(),
      cooldown: Number(cooldown) || 0,
      enabled,
    });

    setSaving(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className={styles.title}>Edit Command</h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.group}>
            <label>Name</label>
            <input
              value={name}
              maxLength={32}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label>Response</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label>Cooldown (seconds)</label>
            <input
              type="number"
              min="0"
              value={cooldown}
              onChange={(e) => setCooldown(e.target.value)}
            />
          </div>

          <div className={styles.checkRow}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              Enabled
            </label>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save"}
            </button>

            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
