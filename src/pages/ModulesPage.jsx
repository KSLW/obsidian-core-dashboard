import React, { useEffect, useState } from "react";
import styles from "./ModulesPage.module.css";
import  useModules  from "../hooks/useModules";
import { motion } from "framer-motion";

export default function ModulesPage() {
  const { modules, loading, error, refresh, toggleModule } = useModules();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.description || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : m.enabled === (filter === "enabled");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Modules</h1>

      {/* Controls row */}
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.filter}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="enabled">Enabled only</option>
          <option value="disabled">Disabled only</option>
        </select>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredModules.map((mod) => (
          <motion.div
            key={mod.id}
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.header}>
              <h3 className={styles.cardName}>{mod.name}</h3>

              <span
                className={`${styles.status} ${
                  mod.enabled ? styles.enabled : styles.disabled
                }`}
              >
                {mod.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>

            <p className={styles.description}>{mod.description}</p>

            <div className={styles.footer}>
              <button
                onClick={() => toggleModule(mod.id, !mod.enabled)}
                className={styles.toggleBtn}
              >
                {mod.enabled ? "Disable" : "Enable"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
