// src/components/CommandTable.jsx
import React, { useState } from "react";
import CommandEditModal from "./CommandEditModal";
import styles from "./CommandTable.module.css";
import { Pencil, Trash2 } from "lucide-react";

export default function CommandTable({ commands, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Response</th>
            <th>Cooldown</th>
            <th>Enabled</th>
            <th className={styles.actionsCol}></th>
          </tr>
        </thead>

        <tbody>
          {commands.map((cmd) => (
            <tr key={cmd._id}>
              <td className={styles.name}>{cmd.name}</td>

              <td className={styles.response}>
                <div className={styles.responseText}>{cmd.response}</div>
              </td>

              <td>{cmd.cooldown}s</td>

              <td>
                <span
                  className={cmd.enabled ? styles.enabled : styles.disabled}
                >
                  {cmd.enabled ? "Yes" : "No"}
                </span>
              </td>

              <td className={styles.actions}>
                <button
                  className={styles.iconBtn}
                  onClick={() => setEditing(cmd)}
                  aria-label="Edit command"
                >
                  <Pencil size={16} />
                </button>

                <button
                  className={`${styles.iconBtn} ${styles.delete}`}
                  onClick={() => onDelete(cmd._id)}
                  aria-label="Delete command"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <CommandEditModal
          command={editing}
          onClose={() => setEditing(null)}
          onSave={(payload) => {
            onUpdate(editing._id, payload);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}
