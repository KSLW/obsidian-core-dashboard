import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const portalRoot = document.getElementById("modal-root");

  return createPortal(children, portalRoot);
}
