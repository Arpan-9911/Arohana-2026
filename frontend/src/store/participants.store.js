import { create } from "zustand"
import { getUsers, approveUser, rejectUser } from "@/lib/admin.service"

export const useParticipantsStore = create((set, get) => ({
  participants: [],
  loading: false,
  hasFetched: false,
  selectedParticipant: null,

  fetchParticipants: async () => {
    if (get().hasFetched) return

    set({ loading: true })
    try {
      const data = await getUsers()
      if (data.success) {
        set({
          participants: data.users,
          hasFetched: true
        })
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      set({ loading: false })
    }
  },

  setSelectedParticipant: (participant) => {
    set({ selectedParticipant: participant })
  },

  approveParticipant: async (id) => {
    const result = await approveUser(id)
    if (result.success) {
      set((state) => ({
        participants: state.participants.map((p) =>
          p._id === id ? { ...p, status: "approved" } : p
        ),
        selectedParticipant: null
      }))
    }
    return result
  },

  rejectParticipant: async (id, reason) => {
    const result = await rejectUser(id, reason)
    if (result.success) {
      set((state) => ({
        participants: state.participants.map((p) =>
          p._id === id ? { ...p, status: "rejected" } : p
        ),
        selectedParticipant: null
      }))
    }
    return result
  }
}))