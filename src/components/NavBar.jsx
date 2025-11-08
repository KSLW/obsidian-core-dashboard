import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();
  const links = [
    { path: "/", label: "🏠 Home" },
    { path: "/dashboard", label: "🎮 Dashboard" },
    { path: "/commands", label: "⚙️ Commands" },
    { path: "/automations", label: "🤖 Automations" },
    { path: "/personality", label: "🧠 AI Personality" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex gap-4 text-sm">
      {links.map((l) => (
        <Link
          key={l.path}
          to={l.path}
          className={`px-3 py-1 rounded-md ${
            pathname === l.path ? "bg-green-600 text-black" : "hover:bg-gray-800"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
