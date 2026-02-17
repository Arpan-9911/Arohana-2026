import api from "./api";

// Fetch all events
export const getAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// Get event by ID
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// Participate in solo event
export const participateSolo = async (eventId) => {
  const response = await api.post(`/events/${eventId}/participate`);
  return response.data;
};

// Create a team for group event
export const createTeam = async (eventId, teamName) => {
  const response = await api.post(`/events/${eventId}/create-team`, {
    name: teamName,
  });
  return response.data;
};

// Join a team using team code
export const joinTeam = async (teamCode) => {
  const response = await api.post("/teams/join", {
    teamCode,
  });
  return response.data;
};

// Submit event deliverable
export const submitEvent = async (eventId, url) => {
  const response = await api.post(`/events/${eventId}/submit`, {
    url,
  });
  return response.data;
};
