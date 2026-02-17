import { create } from "zustand";
import {
  getSocietyEvents,
  createEvent,
  deleteEvent,
  getEventParticipants,
} from "../lib/admin.service";

export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
  participants: [],

  /* ================= FETCH EVENTS ================= */
  fetchEvents: async () => {
    try {
      set({ loading: true });
      const data = await getSocietyEvents();
      set({ events: data.events, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch events", loading: false });
    }
  },

  /* ================= CREATE EVENT ================= */
  addEvent: async (formData) => {
    try {
      set({ loading: true });
      const data = await createEvent(formData);
      set((state) => ({ events: [data.event, ...state.events], loading: false }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create event", loading: false });
      return { success: false };
    }
  },

  /* ================= DELETE EVENT ================= */
  deleteEvent: async (id) => {
    try {
      await deleteEvent(id);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        selectedEvent: state.selectedEvent === id ? null : state.selectedEvent,
        participants: state.selectedEvent === id ? [] : state.participants,
      }));
    } catch (err) {
      console.error(err);
    }
  },

  /* ================= SELECT EVENT ================= */
  selectEvent: async (eventId) => {
    try {
      set({ loading: true, selectedEvent: eventId, participants: [] });
      const res = await getEventParticipants(eventId);
      set({ participants: res.participants });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
