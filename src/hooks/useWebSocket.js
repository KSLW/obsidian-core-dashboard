import { useEffect } from "react";

export function useWebSocket(onEvent) {
  useEffect(() => {
    const url = process.env.REACT_APP_WS_URL || "ws://localhost:3002";
    const ws = new WebSocket(url);

    ws.onopen = () => console.log("✅ Connected to WebSocket");
    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        onEvent?.(data);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };
    ws.onclose = () => console.warn("🔌 WebSocket closed");
    return () => ws.close();
  }, [onEvent]);
}
