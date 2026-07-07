import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

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
  firebaseUser: FirebaseUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  initAuthListener: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  firebaseUser: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: async () => {
    try {
      await signOut(auth);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
      set({ user: null, firebaseUser: null, accessToken: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error', error);
    }
  },
  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }
        
        // At this point we have Firebase Auth. We should call our backend to get the full profile.
        // For now, we set minimal state and allow components to fetch full profile.
        set({
          firebaseUser,
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
        }
        set({
          user: null,
          firebaseUser: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return unsubscribe;
  },
}));
