import styles from "../styles/alert.module.css";
import clsx from "clsx";

export default function Alert({ type = "info", children }) {
  return (
    <div className={clsx(styles.alert, styles[type])}>
      {children}
      <Alert type="success">Command saved successfully!</Alert>
    </div>
  );
}
