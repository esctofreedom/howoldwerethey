import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CountryState {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      selectedCountry: "US",
      setSelectedCountry: (country) => set({ selectedCountry: country }),
    }),
    {
      name: "country-storage", // unique name for localStorage key
    }
  )
);
