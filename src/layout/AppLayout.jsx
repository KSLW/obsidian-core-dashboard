import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Zap,
  Package,
  Settings,
  Menu,
  X,
  LayoutDashboard
} from "lucide-react";

import styles from "./AppLayout.module.css";
import StatusBar from "../components/StatusBar";

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.layout}>
      
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>

        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>Obsidian</h2>

          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/commands"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <MessageSquare size={18} />
            <span>Commands</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <Zap size={18} />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/modules"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <Package size={18} />
            <span>Modules</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.content}>
        <button className={styles.openBtn} onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>

        <StatusBar />

        <div className={styles.pageContent}>
          {children}
        </div>
      </main>

    </div>
  );
}
