import Input from "../../components/Input";
import Button from "../../components/Button";
import FormSection from "../../components/FormSection";

export default function ProfileTab({ profile, setProfile, onSave }) {
  function update(field, value) {
    setProfile({ ...profile, [field]: value });
  }

  return (
    <>
      <FormSection
        title="Streamer Profile"
        description="Basic details for identifying your channel."
      >
        <Input
          label="Streamer Name"
          value={profile.streamerName}
          onChange={(e) => update("streamerName", e.target.value)}
        />
        <Input
          label="Command Prefix"
          value={profile.prefix}
          onChange={(e) => update("prefix", e.target.value)}
        />
      </FormSection>

      <Button onClick={() => onSave("profile", profile)}>Save Profile</Button>
    </>
  );
}
