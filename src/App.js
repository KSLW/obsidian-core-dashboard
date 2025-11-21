import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AppLayout from "./layout/AppLayout";
import PageTransition from "./components/PageTransition";

import { ToastProvider } from "./context/ToastContext";
import ThemeBootstrap from "./theme/ThemeBootstrap";

import DashboardPage from "./pages/DashboardPage";
import CommandsPage from "./pages/CommandsPage";
import EventsPage from "./pages/EventsPage";
import ModulesPage from "./pages/ModulesPage";
import SettingsPage from "./pages/SettingsPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition keyValue={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/auth/twitch/" />
          <Route path="/auth/discord/" />
          <Route path="/api/auth/discord/login" element={<DashboardPage />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ThemeBootstrap>
          <AppLayout>
            <AnimatedRoutes />
          </AppLayout>
        </ThemeBootstrap>
      </ToastProvider>
    </BrowserRouter>
  );
}
