import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function StreamDashboard() {
  const [accountStatus, setAccountStatus] = useState({});
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState("");
  const [logs, setLogs] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "green");
  const [compactMode, setCompactMode] = useState(
    localStorage.getItem("compactMode") === "true"
  );

  // ─────────────────────────────────────────────
  // 📡 Fetch account status
  async function fetchStatus() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/streamer/status`);
      setAccountStatus(data);
    } catch (err) {
      console.error("Failed to fetch account status:", err.message);
    }
  }

  // 🎬 Fetch scenes from OBS
  async function fetchScenes() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/obs/scenes`);
      setScenes(data.scenes || []);
      setCurrentScene(data.current || "");
    } catch (err) {
      console.error("Failed to fetch scenes:", err.message);
    }
  }

  // 🎚️ Change OBS scene
  async function changeScene(scene) {
    try {
      await axios.post(`${BACKEND_URL}/api/obs/scene`, { scene });
      setCurrentScene(scene);
    } catch (err) {
      console.error("Scene switch failed:", err.message);
    }
  }

  // 🎨 Change theme
  function changeTheme(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  // 🔄 Toggle compact mode
  function toggleCompactMode() {
    const newVal = !compactMode;
    setCompactMode(newVal);
    localStorage.setItem("compactMode", newVal);
  }

  // ─────────────────────────────────────────────
  // 📡 WebSocket Live Events
  useEffect(() => {
    fetchStatus();
    fetchScenes();

    const ws = new WebSocket("ws://localhost:3002");
    ws.onopen = () => setConnectionStatus("connected");
    ws.onclose = () => setConnectionStatus("disconnected");
    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        setLogs((prev) => [event, ...prev]);
        if (event.type === "sceneChanged") setCurrentScene(event.data.scene);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    return () => ws.close();
  }, []);

  // ─────────────────────────────────────────────
  // 🧱 UI
  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-4">
        🎮 Stream Dashboard
      </h1>

      {/* 🔗 Connections Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-300 mb-3">Connections</h2>
        <div className="flex gap-4 flex-wrap">
          {/* Twitch */}
          {accountStatus?.twitch ? (
            <button className="px-4 py-2 bg-green-600 rounded-lg text-black font-semibold">
              ✅ Twitch Connected
            </button>
          ) : (
            <a
              href={`${BACKEND_URL}/api/auth/twitch`}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
            >
              Connect Twitch
            </a>
          )}

          {/* Discord */}
          {accountStatus?.discord ? (
            <button className="px-4 py-2 bg-green-600 rounded-lg text-black font-semibold">
              ✅ Discord Connected
            </button>
          ) : (
            <a
              href={`${BACKEND_URL}/api/auth/discord`}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
            >
              Connect Discord
            </a>
          )}
        </div>
      </div>

      {/* 🎨 Theme + Compact Mode */}
      <div className="flex justify-end gap-3 mb-4">
        <select
          value={theme}
          onChange={(e) => changeTheme(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:ring-2 focus:ring-green-400"
        >
          <option value="green">🌿 Green</option>
          <option value="purple">💜 Purple</option>
          <option value="blue">💙 Blue</option>
          <option value="red">🔥 Red</option>
          <option value="pink">🌸 Pink</option>
        </select>

        <button
          onClick={toggleCompactMode}
          className={`px-3 py-2 rounded font-semibold border ${
            compactMode
              ? "bg-green-600 text-black border-green-400"
              : "bg-gray-800 text-white border-gray-600"
          }`}
        >
          {compactMode ? "🧩 Compact On" : "🧱 Compact Off"}
        </button>
      </div>

      {/* 🎬 Scenes */}
      <h2 className="text-lg font-semibold text-green-300 mb-2">OBS Scenes</h2>
      <div
        className={`grid ${
          compactMode
            ? "grid-cols-3 gap-2"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        } mb-6`}
      >
        {scenes.map((scene) => (
          <button
            key={scene}
            onClick={() => changeScene(scene)}
            className={`rounded font-semibold transition-all ${
              compactMode ? "p-2 text-sm" : "p-4 text-base"
            } ${
              currentScene === scene
                ? "bg-green-500 text-black shadow-lg scale-105"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            🎬 {scene}
          </button>
        ))}
      </div>

      {/* 🧠 OBS Connection */}
      <p className="text-sm text-gray-400 mb-2">
        OBS Connection:{" "}
        <span
          className={
            connectionStatus === "connected"
              ? "text-green-400"
              : "text-red-400"
          }
        >
          {connectionStatus}
        </span>
      </p>

      {/* 🪵 Event Log */}
      <div className="bg-gray-900 p-3 rounded h-64 overflow-y-auto text-sm text-green-300">
        {logs.map((e, i) => (
          <div key={i}>
            [{new Date(e.timestamp).toLocaleTimeString()}] {e.type}:{" "}
            {JSON.stringify(e.data)}
          </div>
        ))}
      </div>
    </div>
  );
}
