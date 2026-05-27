import { useMemo } from "react"

import { filterProperties } from "@/utils/filter-properties"
import { useFilterStore } from "@/stores/filter-store"
import { usePropertyStore } from "@/stores/property-store"

export function useProperties() {
  const properties = usePropertyStore((state) => state.properties)
  const selectedPropertySlug = usePropertyStore(
    (state) => state.selectedPropertySlug
  )
  const setSelectedPropertySlug = usePropertyStore(
    (state) => state.setSelectedPropertySlug
  )
  const loadProperties = usePropertyStore((state) => state.loadProperties)
  const filters = useFilterStore((state) => state.filters)

  const filteredProperties = useMemo(
    () => filterProperties(properties, filters),
    [filters, properties]
  )

  return {
    properties,
    filteredProperties,
    selectedPropertySlug,
    setSelectedPropertySlug,
    loadProperties,
  }
}

