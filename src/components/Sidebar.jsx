import styles from "../styles/sidebar.module.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Obsidian</h2>

      <nav>
        <ul>
          <li><NavLink to="/">Dashboard</NavLink></li>
          <li><NavLink to="/commands">Commands</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/modules">Modules</NavLink></li>
          <li><NavLink to="/settings">Settings</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
