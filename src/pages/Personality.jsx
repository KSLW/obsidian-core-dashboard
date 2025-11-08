import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Personality() {
  const [persona, setPersona] = useState({});
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await axios.get(`${BACKEND_URL}/api/ai/personality/default`);
    setPersona(data);
    setLoading(false);
  }

  async function save() {
    await axios.post(`${BACKEND_URL}/api/ai/personality/default`, persona);
    alert("Personality saved!");
  }

  useEffect(() => { load(); }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl text-green-400 font-bold mb-4">🧠 AI Personality</h1>
      <div className="grid gap-2 w-full max-w-xl">
        {["name", "style", "tone", "humor"].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={persona[field] || ""}
            onChange={(e) => setPersona({ ...persona, [field]: e.target.value })}
            className="bg-gray-800 px-2 py-1 rounded text-white"
          />
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={persona.nsfw}
            onChange={(e) => setPersona({ ...persona, nsfw: e.target.checked })}
          />
          Allow light adult humor (18+)
        </label>

        <textarea
          placeholder="Catchphrases (comma separated)"
          value={persona.catchphrases?.join(", ") || ""}
          onChange={(e) =>
            setPersona({
              ...persona,
              catchphrases: e.target.value.split(",").map((v) => v.trim()),
            })
          }
          className="bg-gray-800 px-2 py-1 rounded text-white"
        />

        <button
          onClick={save}
          className="bg-green-500 text-black font-semibold px-3 py-1 rounded"
        >
          Save Personality
        </button>
      </div>
    </div>
  );
}
