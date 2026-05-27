import { appEnv } from "@/lib/env"
import type { MapboxViewport } from "@/types/mapbox"
import type { PropertyListing } from "@/types/property"

export type MapboxFeature = GeoJSON.Feature<GeoJSON.Point, { propertyId: string }>
export type MapboxFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  { propertyId: string }
>

export function getMapboxToken() {
  return appEnv.mapboxToken
}

export function hasMapboxToken() {
  return getMapboxToken().trim().length > 0
}

export function createPropertyFeatureCollection(
  properties: PropertyListing[]
): MapboxFeatureCollection {
  return {
    type: "FeatureCollection",
    features: properties.map((property) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [property.coordinates.longitude, property.coordinates.latitude],
      },
      properties: {
        propertyId: property.id,
      },
    })),
  }
}

export function getInitialViewport(properties: PropertyListing[]): MapboxViewport {
  const firstProperty = properties[0]

  if (!firstProperty) {
    return {
      latitude: -15.601,
      longitude: -56.097,
      zoom: 10,
    }
  }

  return {
    latitude: firstProperty.coordinates.latitude,
    longitude: firstProperty.coordinates.longitude,
    zoom: 11,
  }
}

