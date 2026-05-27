import { create } from "zustand"

import { mockProperties } from "@/lib/mock-properties"
import { filterProperties } from "@/utils/filter-properties"
import { defaultPropertyFilters } from "@/stores/filter-store"
import type { PropertyFilters, PropertyListing } from "@/types/property"

type PropertyStatus = "idle" | "loading" | "ready" | "error"

interface PropertyState {
  properties: PropertyListing[]
  status: PropertyStatus
  error: string | null
  selectedPropertySlug: string | null
  setProperties: (properties: PropertyListing[]) => void
  setSelectedPropertySlug: (slug: string | null) => void
  loadProperties: () => Promise<PropertyListing[]>
  getFilteredProperties: (filters?: PropertyFilters) => PropertyListing[]
}

export const usePropertyStore = create<PropertyState>()((set, get) => ({
  properties: mockProperties,
  status: "ready",
  error: null,
  selectedPropertySlug: mockProperties[0]?.slug ?? null,
  setProperties: (properties) =>
    set({
      properties,
      status: "ready",
      error: null,
      selectedPropertySlug: properties[0]?.slug ?? null,
    }),
  setSelectedPropertySlug: (slug) => set({ selectedPropertySlug: slug }),
  loadProperties: async () => {
    set({ status: "loading", error: null })

    try {
      const properties = mockProperties
      set({
        properties,
        status: "ready",
        error: null,
        selectedPropertySlug: properties[0]?.slug ?? null,
      })

      return properties
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao carregar imóveis"

      set({
        status: "error",
        error: message,
      })

      throw error
    }
  },
  getFilteredProperties: (filters = defaultPropertyFilters) => {
    const properties = get().properties
    return filterProperties(properties, filters)
  },
}))

export function getPropertyBySlug(slug: string) {
  return usePropertyStore.getState().properties.find((property) => property.slug === slug)
}
