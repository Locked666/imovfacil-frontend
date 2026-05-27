import * as React from "react"
import type { GeoJSONSource, Map as MapboxMapInstance, MapLayerMouseEvent } from "mapbox-gl"

import { createPropertyFeatureCollection } from "@/services/mapbox.service"
import type { PropertyListing } from "@/types/property"

interface MapMarkersLayerProps {
  map: MapboxMapInstance | null
  properties: PropertyListing[]
  onSelectProperty?: (propertyId: string) => void
}

export function MapMarkersLayer({
  map,
  properties,
  onSelectProperty,
}: MapMarkersLayerProps) {
  React.useEffect(() => {
    if (!map) {
      return undefined
    }

    const sourceId = "properties-source"
    const clusterLayerId = "properties-clusters"
    const clusterCountLayerId = "properties-cluster-count"
    const unclusteredLayerId = "properties-unclustered"
    let isDisposed = false
    let cleanupLayers: (() => void) | undefined

    const removeLayers = () => {
      if (!map.isStyleLoaded()) {
        return
      }

      if (map.getLayer(unclusteredLayerId)) {
        map.removeLayer(unclusteredLayerId)
      }
      if (map.getLayer(clusterCountLayerId)) {
        map.removeLayer(clusterCountLayerId)
      }
      if (map.getLayer(clusterLayerId)) {
        map.removeLayer(clusterLayerId)
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId)
      }
    }

    const addLayers = () => {
      if (isDisposed || !map.isStyleLoaded()) {
        return
      }

      removeLayers()

      map.addSource(sourceId, {
        type: "geojson",
        data: createPropertyFeatureCollection(properties),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })

      map.addLayer({
        id: clusterLayerId,
        type: "circle",
        source: sourceId,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#2563eb",
          "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 25, 28],
          "circle-opacity": 0.92,
        },
      })

      map.addLayer({
        id: clusterCountLayerId,
        type: "symbol",
        source: sourceId,
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      })

      map.addLayer({
        id: unclusteredLayerId,
        type: "circle",
        source: sourceId,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#0f172a",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })

      const handleClusterClick = (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0]
        if (!feature) {
          return
        }
        const clusterId = feature?.properties?.cluster_id as number | undefined
        const source = map.getSource(sourceId) as GeoJSONSource | undefined

        if (!source || typeof clusterId !== "number") {
          return
        }

        source.getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error || typeof zoom !== "number") {
            return
          }

          const coordinates = (feature.geometry as GeoJSON.Point).coordinates
          map.easeTo({
            center: coordinates as [number, number],
            zoom,
          })
        })
      }

      const handlePropertyClick = (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0]
        const propertyId = feature?.properties?.propertyId as string | undefined

        if (propertyId) {
          onSelectProperty?.(propertyId)
        }
      }

      map.on("click", clusterLayerId, handleClusterClick)
      map.on("click", unclusteredLayerId, handlePropertyClick)
      map.on("mouseenter", clusterLayerId, () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseenter", unclusteredLayerId, () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", clusterLayerId, () => {
        map.getCanvas().style.cursor = ""
      })
      map.on("mouseleave", unclusteredLayerId, () => {
        map.getCanvas().style.cursor = ""
      })

      cleanupLayers = () => {
        map.off("click", clusterLayerId, handleClusterClick)
        map.off("click", unclusteredLayerId, handlePropertyClick)
        removeLayers()
      }
    }

    if (map.isStyleLoaded()) {
      addLayers()
    } else {
      const handleLoad = () => {
        addLayers()
      }

      map.on("load", handleLoad)

      cleanupLayers = () => {
        map.off("load", handleLoad)
        removeLayers()
      }
    }

    return () => {
      isDisposed = true
      cleanupLayers?.()
    }
  }, [map, onSelectProperty, properties])

  return null
}
