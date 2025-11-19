import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Input from "../components/Input";
import TextArea from "../components/Textarea";

import {
  getCommands,
  createCommand,
  updateCommand,
  deleteCommand,
} from "../api/commands";

export default function Commands() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal controls
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Fetch commands
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getCommands();
    setCommands(data);
    setLoading(false);
  }

  // Open create modal
  function openCreate() {
    setName("");
    setResponse("");
    setCooldown(0);
    setCreateOpen(true);
  }

  // Open edit modal
  function openEdit(cmd) {
    setSelected(cmd);
    setName(cmd.name);
    setResponse(cmd.response);
    setCooldown(cmd.cooldown);
    setEditOpen(true);
  }

  // Open delete modal
  function openDelete(cmd) {
    setSelected(cmd);
    setDeleteOpen(true);
  }

  // Handle create
  async function handleCreate() {
    await createCommand({ name, response, cooldown });
    setCreateOpen(false);
    setAlert("Command created successfully.");
    loadData();
  }

  // Handle update
  async function handleUpdate() {
    await updateCommand(selected.id, { name, response, cooldown });
    setEditOpen(false);
    setAlert("Command updated.");
    loadData();
  }

  // Handle delete
  async function handleDelete() {
    await deleteCommand(selected.id);
    setDeleteOpen(false);
    setAlert("Command deleted.");
    loadData();
  }

  return (
    <>
      <PageHeader
        title="Commands"
        description="Manage your chat commands."
        actions={<Button onClick={openCreate}>New Command</Button>}
      />

      {alert && <Alert type="success">{alert}</Alert>}

      <Table
        columns={["Command", "Response", "Cooldown", "Actions"]}
        data={commands}
        loading={loading}
        emptyMessage="No commands found."
        renderRow={(cmd) => (
          <>
            <td>{cmd.name}</td>
            <td>{cmd.response}</td>
            <td>{cmd.cooldown}s</td>
            <td className="actions">
              <Button size="small" variant="secondary" onClick={() => openEdit(cmd)}>Edit</Button>
              <Button size="small" variant="danger" onClick={() => openDelete(cmd)}>Delete</Button>
            </td>
          </>
        )}
      />

      {/* CREATE MODAL */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Command"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Save</Button>
          </>
        }
      >
        <Input label="Command Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextArea label="Response" value={response} onChange={(e) => setResponse(e.target.value)} />
        <Input label="Cooldown (seconds)" type="number" value={cooldown} onChange={(e) => setCooldown(parseInt(e.target.value))} />
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Command"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </>
        }
      >
        <Input label="Command Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextArea label="Response" value={response} onChange={(e) => setResponse(e.target.value)} />
        <Input label="Cooldown (seconds)" type="number" value={cooldown} onChange={(e) => setCooldown(parseInt(e.target.value))} />
      </Modal>

      {/* DELETE CONFIRMATION */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Command"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selected?.name}</strong>?</p>
      </Modal>
    </>
  );
}
