import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userData) => set({ isAuthenticated: true, user: userData }),

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('auth-storage'); 
        localStorage.removeItem('userData'); 
      }
    }),
    {
      name: 'auth-storage', // Key for localStorage
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }) // Specify what to persist
    }
  )
);

export default useAuthStore;
