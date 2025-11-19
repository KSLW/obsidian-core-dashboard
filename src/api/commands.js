let commands = [
  { id: "1", name: "!hello", response: "Hello there!", cooldown: 5 },
  { id: "2", name: "!lurk", response: "Enjoy your lurk 💜", cooldown: 0 },
];

// Simulate network delay
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export async function getCommands() {
  await delay();
  return [...commands];
}

export async function createCommand(data) {
  await delay();
  const newCmd = { ...data, id: Date.now().toString() };
  commands.push(newCmd);
  return newCmd;
}

export async function updateCommand(id, data) {
  await delay();
  commands = commands.map(cmd => cmd.id === id ? { ...cmd, ...data } : cmd);
  return commands.find(cmd => cmd.id === id);
}

export async function deleteCommand(id) {
  await delay();
  commands = commands.filter(cmd => cmd.id !== id);
  return true;
}
