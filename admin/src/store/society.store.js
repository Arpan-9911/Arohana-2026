// society.store.js
import { create } from "zustand"
import { getSocieties, createSociety as createSocietyAPI } from "@/lib/admin.service"

export const useSocietyStore = create((set, get) => ({
  societies: [],
  loading: false,
  hasFetched: false,

  fetchSocieties: async () => {
    if (get().hasFetched) return;
    set({ loading: true })
    try {
      const data = await getSocieties()
      if (data.success) {
        set({
          societies: data.societies,
          hasFetched: true
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },

  createSociety: async (newSocietyData) => {
    const response = await createSocietyAPI(newSocietyData)
    if (response.success) {
      set((state) => ({
        societies: [...state.societies, response.society]
      }))
    }

    return response
  }
}))