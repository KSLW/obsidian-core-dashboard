import Button from "../../components/Button";
import Toggle from "../../components/Toggle";
import FormSection from "../../components/FormSection";

export default function IntegrationsTab({ integrations, setIntegrations, onSave }) {

  function update(field, value) {
    setIntegrations({ ...integrations, [field]: value });
  }

  return (
    <>
      <FormSection
        title="Twitch Integration"
        description="Manage your Twitch OAuth connection."
      >
        <Toggle
          checked={integrations.twitchConnected}
          onChange={(e) => update("twitchConnected", e.target.checked)}
        />
        <span style={{ marginLeft: 10 }}>
          {integrations.twitchConnected ? "Connected" : "Not Connected"}
        </span>
      </FormSection>

      <FormSection
        title="Discord Integration"
        description="Connect Obsidian to your Discord server."
      >
        <Toggle
          checked={integrations.discordConnected}
          onChange={(e) => update("discordConnected", e.target.checked)}
        />
        <span style={{ marginLeft: 10 }}>
          {integrations.discordConnected ? "Connected" : "Not Connected"}
        </span>
      </FormSection>

      <Button onClick={() => onSave("integrations", integrations)}>Save Integrations</Button>
    </>
  );
}
