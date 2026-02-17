import { create } from "zustand";
import { getAllSocieties } from "../lib/society.service";

export const useSocietyStore = create((set) => ({
  societies: [],
  loading: false,
  error: null,

  fetchSocieties: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getAllSocieties();
      set({ societies: data.societies, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch societies",
      });
    }
  },
}));