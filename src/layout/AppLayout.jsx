import Sidebar from "../components/Sidebar";
import styles from "../layout/AppLayout.module.css";

export default function AppLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
