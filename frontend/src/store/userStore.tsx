import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  photo?: string | null; // photo optional and can be null
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  // 🔥 IMPORTANT: initial token from sessionStorage
  token: sessionStorage.getItem("token"),

  setUser: (user, token) => {
    sessionStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    sessionStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
