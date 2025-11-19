let modules = [
  {
    id: "1",
    name: "Chat Commands",
    description: "Enables custom chat commands.",
    enabled: true,
  },
  {
    id: "2",
    name: "Event Handler",
    description: "Responds to Twitch events such as follows and raids.",
    enabled: true,
  },
  {
    id: "3",
    name: "Discord Sync",
    description: "Syncs roles, messages, and features with Discord.",
    enabled: false,
  },
];

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export async function getModules() {
  await delay();
  return [...modules];
}

export async function createModule(data) {
  await delay();
  const newModule = { ...data, id: Date.now().toString() };
  modules.push(newModule);
  return newModule;
}

export async function updateModule(id, data) {
  await delay();
  modules = modules.map(m => (m.id === id ? { ...m, ...data } : m));
  return modules.find(m => m.id === id);
}

export async function deleteModule(id) {
  await delay();
  modules = modules.filter(m => m.id !== id);
  return true;
}
