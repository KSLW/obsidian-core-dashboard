import React from "react";
import { motion } from "framer-motion";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export default function Login() {
  const discordLogin = `${BACKEND}/api/oauth/discord/login`;
const twitchLogin = `${BACKEND}/api/oauth/twitch/login`;


  return (
    <motion.div className="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Welcome to Obsidian Core</h1>
      <p>Connect your streaming accounts to start managing your bot.</p>

      <div className="login-buttons">
        <a href={discordLogin} className="btn discord">💬 Connect Discord</a>
        <a href={twitchLogin} className="btn twitch">🎮 Connect Twitch</a>
      </div>
    </motion.div>
  );
}
