// user.store.js
import { create } from "zustand";
import {
  checkUserAuth,
  logoutUser,
  reuploadDocuments,
} from "../lib/user.service.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  hasChecked: false,

  // ✅ CHECK AUTH
  checkAuth: async () => {
    if (get().hasChecked) return;

    try {
      const response = await checkUserAuth();

      if (response.success) {
        set({
          user: response.user,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error(error);
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        loading: false,
        hasChecked: true,
      });
    }
  },

  // ✅ SET USER AFTER LOGIN
  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
      loading: false,
      hasChecked: true,
    });
  },

  // ✅ LOGOUT
  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        hasChecked: false,
      });
    }
  },

  // ✅ REUPLOAD DOCUMENTS
  reuploadUserDocuments: async (formData) => {
    try {
      set({ loading: true });

      const response = await reuploadDocuments(formData);

      if (response.success) {
        // update user locally without re-fetching
        set((state) => ({
          user: {
            ...state.user,
            status: "pending",
            rejectionReason: null,
            documentsUpdatedAt: new Date(),
          },
        }));
      }

      return response;
    } catch (error) {
      console.error("Reupload error:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));