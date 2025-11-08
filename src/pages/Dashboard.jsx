import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [connected, setConnected] = useState({});
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("connected")) {
      const platform = params.get("connected");
      setConnected(prev => ({ ...prev, [platform]: true }));
    }
  }, [location.search]);

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>

      <div className="connections">
        <h3>Connections</h3>
        <ul>
          <li>Discord: {connected.discord ? "✅ Connected" : "❌ Not connected"}</li>
          <li>Twitch: {connected.twitch ? "✅ Connected" : "❌ Not connected"}</li>
        </ul>
      </div>

      <p>Use the navigation above to configure your bot’s behavior, commands, and AI personality.</p>
    </div>
  );
}
