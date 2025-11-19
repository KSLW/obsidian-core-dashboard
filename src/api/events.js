let events = [
  { id: "1", type: "Follow", message: "Thanks for the follow! 💜", enabled: true },
  { id: "2", type: "Raid", message: "Raiders incoming! ⚔️", enabled: true },
];

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export async function getEvents() {
  await delay();
  return [...events];
}

export async function createEvent(data) {
  await delay();
  const newEvent = { ...data, id: Date.now().toString() };
  events.push(newEvent);
  return newEvent;
}

export async function updateEvent(id, data) {
  await delay();
  events = events.map(e => (e.id === id ? { ...e, ...data } : e));
  return events.find(e => e.id === id);
}

export async function deleteEvent(id) {
  await delay();
  events = events.filter(e => e.id !== id);
  return true;
}
