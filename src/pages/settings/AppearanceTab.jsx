import Button from "../../components/Button";
import FormSection from "../../components/FormSection";

export default function AppearanceTab({ appearance, setAppearance, onSave }) {

  function update(field, value) {
    setAppearance({ ...appearance, [field]: value });
  }

  return (
    <>
      <FormSection
        title="Theme"
        description="Customize how Obsidian looks."
      >
        <label>Theme</label>
        <select
          className="input"
          value={appearance.theme}
          onChange={(e) => update("theme", e.target.value)}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="obsidian">Obsidian Purple</option>
        </select>
      </FormSection>

      <Button onClick={() => onSave("appearance", appearance)}>
        Save Appearance
      </Button>
    </>
  );
}
