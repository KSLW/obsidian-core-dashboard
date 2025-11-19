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
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/events";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  // Form fields
  const [type, setType] = useState("Follow");
  const [message, setMessage] = useState("");
  const [enabled, setEnabled] = useState(true);

  // Load events
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  }

  // Open modals
  function openCreate() {
    setType("Follow");
    setMessage("");
    setEnabled(true);
    setCreateOpen(true);
  }

  function openEdit(e) {
    setSelected(e);
    setType(e.type);
    setMessage(e.message);
    setEnabled(e.enabled);
    setEditOpen(true);
  }

  function openDelete(e) {
    setSelected(e);
    setDeleteOpen(true);
  }

  // CRUD handlers
  async function handleCreate() {
    await createEvent({ type, message, enabled });
    setCreateOpen(false);
    setAlert("Event created successfully.");
    loadData();
  }

  async function handleUpdate() {
    await updateEvent(selected.id, { type, message, enabled });
    setEditOpen(false);
    setAlert("Event updated.");
    loadData();
  }

  async function handleDelete() {
    await deleteEvent(selected.id);
    setDeleteOpen(false);
    setAlert("Event deleted.");
    loadData();
  }

  return (
    <>
      <PageHeader
        title="Events"
        description="Manage your Twitch event responses."
        actions={<Button onClick={openCreate}>New Event</Button>}
      />

      {alert && <Alert type="success">{alert}</Alert>}

      <Table
        columns={["Type", "Message", "Enabled", "Actions"]}
        data={events}
        loading={loading}
        emptyMessage="No events configured."
        renderRow={(e) => (
          <>
            <td>{e.type}</td>
            <td>{e.message}</td>
            <td><Toggle checked={e.enabled} onChange={() => {}} /></td>
            <td className="actions">
              <Button size="small" variant="secondary" onClick={() => openEdit(e)}>Edit</Button>
              <Button size="small" variant="danger" onClick={() => openDelete(e)}>Delete</Button>
            </td>
          </>
        )}
      />

      {/* CREATE */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Event"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save</Button>
          </>
        }
      >
        <label>Event Type</label>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option>Follow</option>
          <option>Sub</option>
          <option>Gift Sub</option>
          <option>Mass Gift</option>
          <option>Cheer</option>
          <option>Raid</option>
          <option>Ad Start</option>
          <option>Ad End</option>
          <option>Stream Online</option>
          <option>Stream Offline</option>
        </select>

        <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />

        <div style={{ marginTop: "15px" }}>
          <Toggle checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          <span style={{ marginLeft: "10px" }}>Enabled</span>
        </div>
      </Modal>

      {/* EDIT */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Event"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </>
        }
      >
        <label>Event Type</label>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option>Follow</option>
          <option>Sub</option>
          <option>Gift Sub</option>
          <option>Mass Gift</option>
          <option>Cheer</option>
          <option>Raid</option>
          <option>Ad Start</option>
          <option>Ad End</option>
          <option>Stream Online</option>
          <option>Stream Offline</option>
        </select>

        <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />

        <div style={{ marginTop: "15px" }}>
          <Toggle checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          <span style={{ marginLeft: "10px" }}>Enabled</span>
        </div>
      </Modal>

      {/* DELETE */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Event"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete the <strong>{selected?.type}</strong> event?</p>
      </Modal>
    </>
  );
}
