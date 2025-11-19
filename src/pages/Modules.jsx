import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Toggle from "../components/Toggle";

import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
} from "../api/modules";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);

  // Load modules
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getModules();
    setModules(data);
    setLoading(false);
  }

  // Open modals
  function openCreate() {
    setName("");
    setDescription("");
    setEnabled(true);
    setCreateOpen(true);
  }

  function openEdit(m) {
    setSelected(m);
    setName(m.name);
    setDescription(m.description);
    setEnabled(m.enabled);
    setEditOpen(true);
  }

  function openDelete(m) {
    setSelected(m);
    setDeleteOpen(true);
  }

  // CRUD handlers
  async function handleCreate() {
    await createModule({ name, description, enabled });
    setCreateOpen(false);
    setAlert("Module created successfully.");
    loadData();
  }

  async function handleUpdate() {
    await updateModule(selected.id, { name, description, enabled });
    setEditOpen(false);
    setAlert("Module updated.");
    loadData();
  }

  async function handleDelete() {
    await deleteModule(selected.id);
    setDeleteOpen(false);
    setAlert("Module deleted.");
    loadData();
  }

  return (
    <>
      <PageHeader
        title="Modules"
        description="Enable or configure your Obsidian modules."
        actions={<Button onClick={openCreate}>New Module</Button>}
      />

      {alert && <Alert type="success">{alert}</Alert>}

      <Table
        columns={["Name", "Description", "Enabled", "Actions"]}
        data={modules}
        loading={loading}
        emptyMessage="No modules available."
        renderRow={(m) => (
          <>
            <td>{m.name}</td>
            <td>{m.description}</td>
            <td><Toggle checked={m.enabled} onChange={() => {}} /></td>
            <td className="actions">
              <Button size="small" variant="secondary" onClick={() => openEdit(m)}>Edit</Button>
              <Button size="small" variant="danger" onClick={() => openDelete(m)}>Delete</Button>
            </td>
          </>
        )}
      />

      {/* CREATE */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Module"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save</Button>
          </>
        }
      >
        <Input label="Module Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ marginTop: "15px" }}>
          <Toggle checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          <span style={{ marginLeft: "10px" }}>Enabled</span>
        </div>
      </Modal>

      {/* EDIT */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Module"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </>
        }
      >
        <Input label="Module Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ marginTop: "15px" }}>
          <Toggle checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          <span style={{ marginLeft: "10px" }}>Enabled</span>
        </div>
      </Modal>

      {/* DELETE */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Module"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete the module{" "}
          <strong>{selected?.name}</strong>?
        </p>
      </Modal>
    </>
  );
}
