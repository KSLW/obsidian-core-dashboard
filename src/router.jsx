import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Commands from "./pages/Commands";
import Events from "./pages/Events";
import Modules from "./pages/Modules";
import Settings from "./pages/Settings";

export default function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/events" element={<Events />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
