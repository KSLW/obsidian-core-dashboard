import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL || "http://localhost:3000";
const STREAMER_ID = "logicallysleepy";

export default function CommandManager() {
  const [commands, setCommands] = useState([]);
  const [form, setForm] = useState({
    name: "!example",
    response: "",
    cooldown: 0,
    permissions: ["everyone"],
    platforms: ["discord"],
    enabled: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function fetchCommands() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/commands?streamerId=${STREAMER_ID}`);
      setCommands(res.data || []);
    } catch (err) {
      console.error("Fetch commands failed:", err.message);
    }
  }

  useEffect(() => {
    fetchCommands();
  }, []);

  async function saveCommand(e) {
    e.preventDefault();
    try {
      const payload = { ...form, streamerId: STREAMER_ID };
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/commands/${editingId}`, payload);
        setMessage("✅ Command updated!");
      } else {
        await axios.post(`${BACKEND_URL}/api/commands`, payload);
        setMessage("✅ Command created!");
      }
      setForm({
        name: "!example",
        response: "",
        cooldown: 0,
        permissions: ["everyone"],
        platforms: ["discord"],
        enabled: true,
      });
      setEditingId(null);
      fetchCommands();
    } catch (err) {
      console.error("Save failed:", err.message);
      setMessage("❌ Failed to save command");
    }
  }

  async function editCommand(cmd) {
    setForm({
      name: cmd.name,
      response: cmd.response,
      cooldown: cmd.cooldown,
      permissions: cmd.permissions,
      platforms: cmd.platforms,
      enabled: cmd.enabled,
    });
    setEditingId(cmd._id);
  }

  async function deleteCommand(id) {
    if (!window.confirm("Delete this command?")) return;
    await axios.delete(`${BACKEND_URL}/api/commands/${id}?streamerId=${STREAMER_ID}`);
    fetchCommands();
  }

  const togglePermission = (perm) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter((p) => p !== perm)
        : [...f.permissions, perm],
    }));
  };

  const togglePlatform = (plat) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(plat)
        ? f.platforms.filter((p) => p !== plat)
        : [...f.platforms, plat],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Command Manager</h2>

      {/* Command Form */}
      <form onSubmit={saveCommand} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Command name (e.g. !hydrate)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Cooldown (seconds)"
          value={form.cooldown}
          onChange={(e) => setForm({ ...form, cooldown: e.target.value })}
          className="p-2 bg-gray-800 rounded-lg border border-gray-700"
        />

        <textarea
          placeholder="Command response text"
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
          className="col-span-2 p-2 bg-gray-800 rounded-lg border border-gray-700 h-24"
        />

        {/* Permissions */}
        <div className="flex flex-wrap gap-3">
          {["everyone", "mod", "sub", "owner"].map((p) => (
            <label key={p} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.permissions.includes(p)}
                onChange={() => togglePermission(p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-3">
          {["discord", "twitch", "both"].map((p) => (
            <label key={p} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.platforms.includes(p)}
                onChange={() => togglePlatform(p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
          />
          <span>Enabled</span>
        </div>

        <button
          type="submit"
          className="col-span-2 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          {editingId ? "Update Command" : "Create Command"}
        </button>
      </form>

      {message && <p className="text-center mb-6">{message}</p>}

      {/* Command List */}
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Cooldown</th>
            <th className="p-2">Permissions</th>
            <th className="p-2">Platforms</th>
            <th className="p-2">Enabled</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd) => (
            <tr key={cmd._id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-2">{cmd.name}</td>
              <td className="p-2">{cmd.cooldown}s</td>
              <td className="p-2">{cmd.permissions?.join(", ")}</td>
              <td className="p-2">{cmd.platforms?.join(", ")}</td>
              <td className="p-2">{cmd.enabled ? "✅" : "❌"}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => editCommand(cmd)}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCommand(cmd._id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {commands.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-400 p-4">
                No commands created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
