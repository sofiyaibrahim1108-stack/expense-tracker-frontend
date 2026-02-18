import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Initial login
      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },

    
      setUser: (updatedUser) => {
        set((state) => ({
          user: {
            ...state.user, 
            ...updatedUser, 
          },
        }));
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);