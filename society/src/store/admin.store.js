import { create } from "zustand";
import { checkAdminAuth } from "../lib/admin.service";

export const useAdminStore = create((set, get) => ({
  admin: null,
  loading: false,
  isAuthenticated: false,
  hasChecked: false,

  // 🔥 Set admin after login
  setAdmin: (adminData) => {
    set({
      admin: adminData,
      isAuthenticated: true,
      hasChecked: true,
      loading: false,
    });
  },

  // 🔍 Check authentication (on app load)
  checkAuth: async () => {
    if (get().hasChecked) return;

    set({ loading: true });

    try {
      const response = await checkAdminAuth();

      if (response.success) {
        set({
          admin: response.admin,
          isAuthenticated: true,
        });
      } else {
        set({
          admin: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({
        admin: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        loading: false,
        hasChecked: true,
      });
    }
  },

  // 🚪 Logout
  logout: () => {
    set({
      admin: null,
      isAuthenticated: false,
      hasChecked: false,
    });
  },

  // 🧹 Reset completely (optional)
  resetAuth: () => {
    set({
      admin: null,
      isAuthenticated: false,
      loading: false,
      hasChecked: false,
    });
  },
}));