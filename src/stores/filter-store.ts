import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { PropertyFilters } from "@/types/property"

export const defaultPropertyFilters: PropertyFilters = {
  purpose: "both",
  category: "all",
  city: "",
  state: "",
  neighborhood: "",
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  areaMin: null,
  ruralResources: [],
}

interface FilterState {
  filters: PropertyFilters
  setFilters: (filters: PropertyFilters) => void
  updateFilters: (filters: Partial<PropertyFilters>) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      filters: defaultPropertyFilters,
      setFilters: (filters) => set({ filters }),
      updateFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),
      resetFilters: () => set({ filters: defaultPropertyFilters }),
    }),
    {
      name: "imovfacil-filters",
    }
  )
)

