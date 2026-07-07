import { create } from 'zustand';

interface User {
  id: string;
  email?: string;
  phone?: string;
  role: string;
  profile?: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    preferredLanguage?: string;
  };
}

interface AuthState {
  user: User | null;
  firebaseUser: any | null; // Kept for backwards compatibility if needed elsewhere
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  initAuthListener: () => () => void;
}

const mockUser: User = {
  id: 'mock-user-123',
  email: 'citizen@smartbharat.gov.in',
  role: 'USER',
  profile: {
    firstName: 'Citizen',
    lastName: 'User',
    preferredLanguage: 'en',
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  firebaseUser: null,
  accessToken: 'mock-jwt-token',
  isAuthenticated: true,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: async () => {
    // In mock mode, logout does nothing, or we just leave them authenticated.
    console.log('Mock logout called - Auth is permanently enabled');
  },
  initAuthListener: () => {
    // Immediately set the authenticated mock state
    set({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      accessToken: 'mock-jwt-token'
    });
    
    // Return a dummy unsubscribe function
    return () => {};
  },
}));
