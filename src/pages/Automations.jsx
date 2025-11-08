import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Automations() {
  const [autos, setAutos] = useState([]);
  const [form, setForm] = useState({
    streamerId: "default",
    name: "Hydrate Alert",
    trigger: { type: "timer", intervalMs: 60000 },
    actions: [
      { type: "send_message", params: { platform: "discord", message: "💧 Stay hydrated!" } }
    ],
    enabled: true
  });

  async function load() {
    const { data } = await axios.get(`${BACKEND_URL}/api/automations`);
    setAutos(data);
  }

  async function createAutomation() {
    await axios.post(`${BACKEND_URL}/api/automations`, form);
    await load();
  }

  async function deleteAutomation(id) {
    await axios.delete(`${BACKEND_URL}/api/automations/${id}`);
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-green-400 font-bold mb-4">🤖 Automations</h1>

      <button
        onClick={createAutomation}
        className="bg-green-500 text-black px-3 py-1 rounded mb-4"
      >
        + Add Timer
      </button>

      <div className="bg-gray-900 p-3 rounded text-sm">
        {autos.map((a) => (
          <div
            key={a._id}
            className="flex justify-between items-center border-b border-gray-700 py-1"
          >
            <span>{a.name} ({a.trigger.type})</span>
            <button
              onClick={() => deleteAutomation(a._id)}
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
