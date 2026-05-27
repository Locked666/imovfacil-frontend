import { ArrowRight, Heart, MapPin, MessageCircle, Share2, Ruler, BedDouble, Bath } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useFavoritesStore } from "@/stores/favorites-store"
import { formatArea, formatCurrency, formatHectares } from "@/lib/formatters"
import type { PropertyListing } from "@/types/property"

interface PropertyCardProps {
  property: PropertyListing
  active?: boolean
  onSelect?: (property: PropertyListing) => void
}

export function PropertyCard({ property, active = false, onSelect }: PropertyCardProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(property.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <Card
      className={
        active
          ? "border-primary/40 ring-2 ring-primary/10"
          : "border-border/80 hover:border-primary/20 hover:shadow-md"
      }
    >
      <CardHeader className="gap-3 p-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {property.premium ? <Badge variant="premium">Premium</Badge> : <Badge variant="outline">Novo</Badge>}
            <Badge variant="secondary">
              {property.purpose === "sale" ? "Venda" : "Locação"}
            </Badge>
          </div>
          <Button
            size="icon-sm"
            variant="secondary"
            className="absolute right-3 top-3 bg-background/90 backdrop-blur"
            onClick={() => toggleFavorite(property.id)}
            aria-label="Favoritar imóvel"
          >
            <Heart className={isFavorite ? "fill-current text-destructive" : undefined} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-semibold leading-tight">{property.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{property.description}</p>
            </div>
            <p className="shrink-0 text-right font-heading text-xl font-semibold text-foreground">
              {formatCurrency(property.price)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {property.location.neighborhood}, {property.location.city} - {property.location.state}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
            <BedDouble className="size-4" />
            {property.features.bedrooms} quartos
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
            <Bath className="size-4" />
            {property.features.bathrooms} banheiros
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
            <Ruler className="size-4" />
            {formatArea(property.features.areaM2)}
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
            <ArrowRight className="size-4" />
            {formatHectares(property.features.ruralAreaHectares)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 pt-0">
        <Button variant="outline" className="flex-1" onClick={() => onSelect?.(property)}>
          Ver detalhes
        </Button>
        <Button variant="ghost" size="icon-sm" asChild>
          <a
            href={`https://wa.me/${property.contactWhatsApp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle />
          </a>
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Compartilhar imóvel">
          <Share2 />
        </Button>
      </CardFooter>
    </Card>
  )
}

