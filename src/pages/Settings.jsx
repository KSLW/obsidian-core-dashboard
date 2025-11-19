import { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import PageHeader from "../components/PageHeader";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Toggle from "../components/Toggle";
import FormSection from "../components/FormSection";
import ProfileTab from "./settings/ProfileTab";
import IntegrationsTab from "./settings/IntergrationTab";
import AppearanceTab from "./settings/AppearanceTab";
import AdvancedTab from "./settings/AdvancedTab";

import { getSettings, updateSettings } from "../api/settings";

export default function Settings() {
  const [active, setActive] = useState("Profile");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  // Settings state
  const [profile, setProfile] = useState({});
  const [integrations, setIntegrations] = useState({});
  const [appearance, setAppearance] = useState({});
  const [advanced, setAdvanced] = useState({});

  // Load settings
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getSettings();
    setProfile(data.profile);
    setIntegrations(data.integrations);
    setAppearance(data.appearance);
    setAdvanced(data.advanced);
    setLoading(false);
  }

  // Save handler for each tab
  async function save(section, data) {
    await updateSettings(section, data);
    setAlert("Settings saved successfully.");
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure Obsidian's global preferences and integrations."
      />

      {alert && <Alert type="success">{alert}</Alert>}

      <Tabs
        tabs={["Profile", "Integrations", "Appearance", "Advanced"]}
        active={active}
        onChange={setActive}
      />

      {loading && <p>Loading settings...</p>}

      {!loading && (
        <>
          {active === "Profile" && (
            <ProfileTab profile={profile} setProfile={setProfile} onSave={save} />
          )}

          {active === "Integrations" && (
            <IntegrationsTab integrations={integrations} setIntegrations={setIntegrations} onSave={save} />
          )}

          {active === "Appearance" && (
            <AppearanceTab appearance={appearance} setAppearance={setAppearance} onSave={save} />
          )}

          {active === "Advanced" && (
            <AdvancedTab advanced={advanced} setAdvanced={setAdvanced} onSave={save} />
          )}
        </>
      )}
    </>
  );
}
