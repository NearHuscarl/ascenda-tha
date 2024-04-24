import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THotel } from "../api/hotels";

export type TFilterStore = {
  currency: string;
  setCurrency: (currency: string) => void;
  lastVisitedHotels: THotel[];
  updateLastVisitedHotel: (hotel: THotel) => void;
};

export const useFilterStore = create<TFilterStore>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set((state) => ({ ...state, currency })),
      lastVisitedHotels: [],
      updateLastVisitedHotel: (hotel) => {
        return set((state) => {
          const hotels = state.lastVisitedHotels.concat(hotel);
          const hotelIdSet = new Set(hotels.map((h) => h.id));
          const next = [...hotelIdSet].map(
            (id) => hotels.find((h) => h.id === id)!
          );
          if (next.length > 3) {
            next.shift();
          }
          return { ...state, lastVisitedHotels: next };
        });
      },
    }),
    {
      name: "filter-storage",
    }
  )
);
