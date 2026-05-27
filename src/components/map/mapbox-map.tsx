import "mapbox-gl/dist/mapbox-gl.css"

import { EmptyState } from "@/components/common/empty-state"
import { MapMarkersLayer } from "@/components/map/map-markers-layer"
import { Button } from "@/components/ui/button"
import { hasMapboxToken } from "@/services/mapbox.service"
import { useMap } from "@/hooks/use-map"
import type { PropertyListing } from "@/types/property"

interface MapboxMapProps {
  properties: PropertyListing[]
  selectedPropertyId?: string | null
  onSelectProperty?: (propertyId: string) => void
}

export function MapboxMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
}: MapboxMapProps) {
  const { mapRef, map, isReady } = useMap({
    properties,
    selectedPropertyId,
  })

  if (!hasMapboxToken()) {
    return (
      <div className="flex h-full min-h-[520px] items-center justify-center rounded-3xl border border-border bg-[linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(241,245,249,0.96)_100%)] p-6">
        <EmptyState
          title="Mapbox ainda não configurado"
          description="Defina VITE_MAPBOX_TOKEN para habilitar o mapa interativo, pins e clusterização na homepage."
          action={<Button variant="outline">Configurar token</Button>}
        />
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
      <div ref={mapRef} className="absolute inset-0" />
      {!isReady ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <EmptyState
            title="Carregando mapa"
            description="Inicializando viewport, controles e pins dos imóveis."
          />
        </div>
      ) : null}
      <MapMarkersLayer map={map} properties={properties} onSelectProperty={onSelectProperty} />
      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Visão geográfica
        </p>
        <p className="mt-1 text-sm text-foreground">
          Pins sincronizados com a listagem lateral
        </p>
      </div>
    </div>
  )
}
