import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TFilterStore = {
  currency: string;
  setCurrency: (currency: string) => void;
};

export const useFilterStore = create<TFilterStore>(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set((state) => ({ ...state, currency })),
    }),
    {
      name: "filter-storage",
    }
  )
);
