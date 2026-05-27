import * as React from "react"
import mapboxgl from "mapbox-gl"

import { getInitialViewport, getMapboxToken } from "@/services/mapbox.service"
import type { MapboxViewport } from "@/types/mapbox"
import type { PropertyListing } from "@/types/property"

interface UseMapOptions {
  properties: PropertyListing[]
  selectedPropertyId?: string | null
}

interface UseMapResult {
  mapRef: React.RefObject<HTMLDivElement | null>
  map: mapboxgl.Map | null
  isReady: boolean
  viewport: MapboxViewport
  flyToProperty: (property: PropertyListing) => void
}

export function useMap({
  properties,
  selectedPropertyId,
}: UseMapOptions): UseMapResult {
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = React.useRef<mapboxgl.Map | null>(null)
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null)
  const [isReady, setIsReady] = React.useState(false)
  const viewport = React.useMemo(() => getInitialViewport(properties), [properties])

  React.useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || !getMapboxToken()) {
      return
    }

    mapboxgl.accessToken = getMapboxToken()

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right")
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
      showUserHeading: true,
    }), "top-right")

    map.on("load", () => {
      setIsReady(true)
    })

    mapInstanceRef.current = map
    setMap(map)

    return () => {
      map.remove()
      mapInstanceRef.current = null
      setMap(null)
      setIsReady(false)
    }
  }, [viewport.latitude, viewport.longitude, viewport.zoom])

  React.useEffect(() => {
    const map = mapInstanceRef.current

    if (!map) {
      return
    }

    if (properties.length === 0) {
      return
    }

    if (selectedPropertyId) {
      const property = properties.find((item) => item.id === selectedPropertyId)

      if (property) {
        map.flyTo({
          center: [property.coordinates.longitude, property.coordinates.latitude],
          zoom: Math.max(map.getZoom(), 13),
          essential: true,
        })
      }
    }
  }, [properties, selectedPropertyId])

  const flyToProperty = React.useCallback((property: PropertyListing) => {
    const map = mapInstanceRef.current

    if (!map) {
      return
    }

    map.flyTo({
      center: [property.coordinates.longitude, property.coordinates.latitude],
      zoom: 14,
      essential: true,
    })
  }, [])

  return {
    mapRef: mapContainerRef,
    map,
    isReady,
    viewport,
    flyToProperty,
  }
}
