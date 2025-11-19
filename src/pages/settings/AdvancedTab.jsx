import Toggle from "../../components/Toggle";
import Button from "../../components/Button";
import FormSection from "../../components/FormSection";

export default function AdvancedTab({ advanced, setAdvanced, onSave }) {

  function update(field, value) {
    setAdvanced({ ...advanced, [field]: value });
  }

  return (
    <>
      <FormSection
        title="Developer Settings"
        description="Danger zone — these options affect internal bot behavior."
      >
        <Toggle
          checked={advanced.developerMode}
          onChange={(e) => update("developerMode", e.target.checked)}
        />
        <span style={{ marginLeft: 10 }}>Developer Mode</span>

        <br /><br />

        <Toggle
          checked={advanced.experimentalFeatures}
          onChange={(e) => update("experimentalFeatures", e.target.checked)}
        />
        <span style={{ marginLeft: 10 }}>Experimental Features</span>
      </FormSection>

      <Button variant="danger" onClick={() => onSave("advanced", advanced)}>
        Save Advanced Settings
      </Button>
    </>
  );
}
