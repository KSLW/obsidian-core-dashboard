import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export default function SceneAliasManager() {
  const [aliases, setAliases] = useState({});
  const [scenes, setScenes] = useState([]);
  const [newInput, setNewInput] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch aliases and scene list
  async function fetchData() {
    try {
      setLoading(true);
      const aliasRes = await axios.get(`${BACKEND}/api/obs/aliases?streamerId=logicallysleepy`);
      const sceneRes = await axios.get(`${BACKEND}/api/obs/scenes`);
      setAliases(aliasRes.data.aliases || {});
      setScenes(sceneRes.data.scenes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleAdd() {
    if (!newInput.trim() || !newTarget.trim()) return;
    try {
      await axios.post(`${BACKEND}/api/obs/aliases`, {
        streamerId: "logicallysleepy",
        input: newInput.trim(),
        actual: newTarget.trim(),
      });
      setNewInput("");
      setNewTarget("");
      fetchData();
    } catch (err) {
      setError("Failed to add alias");
    }
  }

  async function handleDelete(input) {
    try {
      await axios.post(`${BACKEND}/api/obs/aliases`, {
        streamerId: "logicallysleepy",
        input,
        actual: null, // interpret null as delete in backend
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  }

  if (loading) return <div className="p-6 text-gray-400">Loading aliases...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return (
    <div className="p-8 text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-green-300">🎛 Scene Alias Manager</h1>
      <p className="mb-4 text-gray-400">
        Manage how your custom scene names map to OBS scenes.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="e.g. Be Right Back"
          className="p-2 rounded bg-gray-800 text-white"
          value={newInput}
          onChange={(e) => setNewInput(e.target.value)}
        />
        <select
          className="p-2 rounded bg-gray-800 text-white"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
        >
          <option value="">Select Scene</option>
          {scenes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-semibold"
          onClick={handleAdd}
        >
          ➕ Add / Update
        </button>
      </div>

      <table className="min-w-full text-left border border-gray-700 bg-gray-900">
        <thead>
          <tr className="bg-gray-800 text-green-300">
            <th className="px-4 py-2 border-b border-gray-700">Input</th>
            <th className="px-4 py-2 border-b border-gray-700">Mapped Scene</th>
            <th className="px-4 py-2 border-b border-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(aliases).map(([input, target]) => (
            <tr key={input} className="hover:bg-gray-800/50">
              <td className="px-4 py-2 border-b border-gray-700">{input}</td>
              <td className="px-4 py-2 border-b border-gray-700 text-green-400">{target}</td>
              <td className="px-4 py-2 border-b border-gray-700">
                <button
                  onClick={() => handleDelete(input)}
                  className="text-red-400 hover:text-red-500"
                >
                  ✖ Delete
                </button>
              </td>
            </tr>
          ))}
          {!Object.keys(aliases).length && (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-4">
                No aliases saved yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
