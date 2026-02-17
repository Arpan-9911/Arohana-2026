// admin.store.js
import { create } from "zustand";
import { checkAdminAuth } from "@/lib/admin.service";

export const useAdminStore = create((set, get) => ({
  admin: null,
  loading: true,
  isAuthenticated: false,
  hasChecked: false,

  checkAuth: async () => {
    if (get().hasChecked) return;

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
      console.error(error);
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

  logout: () => {
    set({
      admin: null,
      isAuthenticated: false,
    });
  },
}));
