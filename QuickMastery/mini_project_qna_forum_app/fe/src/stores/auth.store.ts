import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    setIsAuthenticated: (auth: boolean, isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    isAdmin: false,
    setIsAuthenticated: (auth, isAdmin) => set({ isAuthenticated: auth, isAdmin: isAdmin }),
}));