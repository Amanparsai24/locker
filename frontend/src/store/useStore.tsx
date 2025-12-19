import { create } from "zustand";

interface User {
    name: string;
    balance: number;
}

interface Store {
    user: User;
}

export const useStore = create<Store>(() => ({
    user: { name: "John Doe", balance: 0 },
}));
