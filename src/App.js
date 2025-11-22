// src/App.js
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
import OAuthCallback from "./pages/OAuthCallback"; // ⭐ NEW

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition keyValue={location.pathname}>
        <Routes location={location}>

          {/* MAIN PAGES */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* ⭐ OAUTH CALLBACK HANDLER */}
          <Route path="/auth/callback" element={<OAuthCallback />} />

          {/* 404 fallback? Optional */}
          <Route path="*" element={<DashboardPage />} />
          
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
