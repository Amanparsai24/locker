import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of your store
interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (updated: Expense) => void;
  clearExpenses: () => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expense: Expense) => {
        set({ expenses: [...get().expenses, expense] });
      },

      removeExpense: (id: string) => {
        set({ expenses: get().expenses.filter(e => e.id !== id) });
      },

      updateExpense: (updated: Expense) => {
        set({
          expenses: get().expenses.map(e =>
            e.id === updated.id ? updated : e
          )
        });
      },

      clearExpenses: () => set({ expenses: [] }),
    }),
    {
      name: "expense-storage", // key in localStorage
      storage: typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined, // you can change to sessionStorage if needed
    }
  )
);
