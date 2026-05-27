import type { PropertyFilters, PropertyListing } from "@/types/property"

export function filterProperties(
  properties: PropertyListing[],
  filters: PropertyFilters
) {
  return properties.filter((property) => {
    if (filters.purpose !== "both" && property.purpose !== filters.purpose) {
      return false
    }

    if (filters.category !== "all" && property.category !== filters.category) {
      return false
    }

    if (filters.city && property.location.city !== filters.city) {
      return false
    }

    if (filters.state && property.location.state !== filters.state) {
      return false
    }

    if (
      filters.neighborhood &&
      !property.location.neighborhood
        .toLowerCase()
        .includes(filters.neighborhood.toLowerCase())
    ) {
      return false
    }

    if (
      typeof filters.minPrice === "number" &&
      property.price < filters.minPrice
    ) {
      return false
    }

    if (
      typeof filters.maxPrice === "number" &&
      property.price > filters.maxPrice
    ) {
      return false
    }

    if (
      typeof filters.bedrooms === "number" &&
      property.features.bedrooms < filters.bedrooms
    ) {
      return false
    }

    if (
      typeof filters.bathrooms === "number" &&
      property.features.bathrooms < filters.bathrooms
    ) {
      return false
    }

    if (
      typeof filters.areaMin === "number" &&
      property.features.areaM2 < filters.areaMin
    ) {
      return false
    }

    if (filters.ruralResources.length > 0) {
      const propertyResources = property.features.waterResources ?? []

      const hasResource = filters.ruralResources.some((resource) =>
        propertyResources.some((currentResource) =>
          currentResource.toLowerCase().includes(resource.toLowerCase())
        )
      )

      if (!hasResource) {
        return false
      }
    }

    return true
  })
}

