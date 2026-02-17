// user.store.js
import { create } from "zustand";
import { checkUserAuth, logoutUser } from "../lib/user.service.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  hasChecked: false,

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

  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
      loading: false,
      hasChecked: true,
    });
  },

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
}));
