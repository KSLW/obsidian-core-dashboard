import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL || "http://localhost:3000";
const STREAMER_ID = "logicallysleepy"; // Replace later with dynamic login context

export default function PersonalityManager() {
  const [personality, setPersonality] = useState({
    name: "",
    style: "",
    humor: "",
    nsfw: false,
    tone: "",
    catchphrases: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load personality on mount
  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/ai/personality/${STREAMER_ID}`);
        if (res.data) {
          setPersonality({
            ...res.data,
            catchphrases: res.data.catchphrases?.join(", ") || "",
          });
        }
      } catch (err) {
        console.error("Failed to load personality:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonality();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonality((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const savePersonality = async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...personality,
        catchphrases: personality.catchphrases
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const res = await axios.post(`${BACKEND_URL}/api/ai/personality/${STREAMER_ID}`, payload);
      setMessage("✅ Personality saved successfully!");
      setPersonality({
        ...res.data,
        catchphrases: res.data.catchphrases?.join(", ") || "",
      });
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("❌ Failed to save personality.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400 text-center mt-10">Loading personality...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🎭 AI Personality Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Name</span>
          <input
            name="name"
            value={personality.name}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Tone</span>
          <select
            name="tone"
            value={personality.tone}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          >
            <option value="friendly">Friendly</option>
            <option value="playful">Playful</option>
            <option value="sarcastic">Sarcastic</option>
            <option value="professional">Professional</option>
            <option value="flirty">Flirty</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Style</span>
          <input
            name="style"
            value={personality.style}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Humor Type</span>
          <select
            name="humor"
            value={personality.humor}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          >
            <option value="dry">Dry</option>
            <option value="goofy">Goofy</option>
            <option value="dark">Dark</option>
            <option value="witty">Witty</option>
            <option value="none">None</option>
          </select>
        </label>

        <label className="flex flex-col col-span-2">
          <span className="mb-1 font-semibold">Catchphrases (comma-separated)</span>
          <input
            name="catchphrases"
            value={personality.catchphrases}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded-lg border border-gray-700"
          />
        </label>

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            name="nsfw"
            checked={personality.nsfw}
            onChange={handleChange}
          />
          <span>Enable NSFW Mode</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={savePersonality}
          disabled={saving}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Personality"}
        </button>
      </div>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
