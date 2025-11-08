import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Commands() {
  const [commands, setCommands] = useState([]);
  const [form, setForm] = useState({
    streamerId: "default",
    name: "!hello",
    response: "👋 Hello {username}!",
    platforms: ["discord"],
    enabled: true
  });

  async function load() {
    const { data } = await axios.get(`${BACKEND_URL}/api/commands`);
    setCommands(data);
  }

  async function createCommand() {
    await axios.post(`${BACKEND_URL}/api/commands`, form);
    await load();
  }

  async function deleteCommand(id) {
    await axios.delete(`${BACKEND_URL}/api/commands/${id}`);
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-green-400 font-bold mb-4">⚙️ Commands</h1>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="!command"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-gray-800 px-2 py-1 rounded text-white"
        />
        <input
          placeholder="Response"
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
          className="bg-gray-800 px-2 py-1 rounded text-white w-1/2"
        />
        <button
          onClick={createCommand}
          className="bg-green-500 text-black px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div className="bg-gray-900 p-3 rounded text-sm">
        {commands.map((c) => (
          <div
            key={c._id}
            className="flex justify-between items-center border-b border-gray-700 py-1"
          >
            <span>{c.name} → {c.response}</span>
            <button
              onClick={() => deleteCommand(c._id)}
              className="text-red-400 hover:text-red-500"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
