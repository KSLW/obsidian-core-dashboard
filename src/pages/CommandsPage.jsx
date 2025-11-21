import React from "react";
import  useCommands  from "../hooks/useCommands";
import CommandTable from "../components/CommandTable";
import CommandForm from "../components/CommandForm";
import styles from "./CommandsPage.module.css";

export default function CommandsPage() {
  const {
    commands,
    loading,
    error,
    createCommand,
    updateCommand,
    deleteCommand,
  } = useCommands();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Commands</h1>

      <div className={styles.formWrapper}>
        <CommandForm onSubmit={createCommand} />
      </div>

      {loading && <p className={styles.loading}>Loading commands…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <CommandTable
          commands={commands}
          onUpdate={updateCommand}
          onDelete={deleteCommand}
        />
      )}
    </div>
  );
}
