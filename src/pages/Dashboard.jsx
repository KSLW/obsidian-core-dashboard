import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Dashboard</h1>

      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Test Modal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p>This is the modal body.</p>
      </Modal>
    </>
  );
}
