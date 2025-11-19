let settings = {
  profile: {
    streamerName: "LogicallySleepy",
    prefix: "!",
  },
  integrations: {
    twitchConnected: false,
    discordConnected: false,
  },
  appearance: {
    theme: "dark",
  },
  advanced: {
    developerMode: false,
    experimentalFeatures: false,
  },
};

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export async function getSettings() {
  await delay();
  return { ...settings };
}

export async function updateSettings(section, data) {
  await delay();
  settings[section] = { ...settings[section], ...data };
  return settings[section];
}
