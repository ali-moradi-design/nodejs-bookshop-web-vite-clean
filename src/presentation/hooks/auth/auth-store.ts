import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/domain';
import { isAdminUser } from '@/domain';
import { getAppDependencies } from '@/presentation/providers/dependencies';

interface AuthState {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  setHydrated: (v: boolean) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (input: { name: string; email: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<User | null>;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      setHydrated: (hydrated) => set({ hydrated }),
      login: async (email, password) => {
        const d = getAppDependencies();
        const res = await d.login(email, password);
        set({ user: res.user });
        try {
          const me = await d.fetchMe();
          set({ user: me });
          return me;
        } catch {
          return res.user;
        }
      },
      register: async (input) => {
        const d = getAppDependencies();
        const res = await d.register(input);
        set({ user: res.user });
        try {
          const me = await d.fetchMe();
          set({ user: me });
          return me;
        } catch {
          return res.user;
        }
      },
      logout: async () => {
        const d = getAppDependencies();
        try {
          await d.logout();
        } finally {
          set({ user: null });
        }
      },
      refreshMe: async () => {
        const d = getAppDependencies();
        try {
          const me = await d.fetchMe();
          set({ user: me });
          return me;
        } catch {
          set({ user: null });
          return null;
        }
      },
      isAdmin: () => isAdminUser(get().user),
    }),
    {
      name: 'bookstore-auth',
      partialize: (s) => ({ user: s.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
