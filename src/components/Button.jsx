import styles from "../styles/button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "normal",
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.btn, styles[variant], styles[size])}
    >
      {children}
    </button>
  );
}
