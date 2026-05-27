import { useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import { Bath, BedDouble, MapPin, MessageCircle, Ruler, Star } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { PageShell } from "@/components/common/page-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useProperties } from "@/hooks/use-properties"
import { formatArea, formatCurrency, formatHectares } from "@/lib/formatters"

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const { properties } = useProperties()

  const property = useMemo(
    () => properties.find((item) => item.slug === slug) ?? null,
    [properties, slug]
  )

  if (!property) {
    return (
      <PageShell>
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-5xl items-center px-4 py-10">
          <EmptyState
            title="Imóvel não encontrado"
            description="O slug informado não corresponde a nenhum anúncio disponível no frontend inicial."
            action={
              <Button asChild>
                <Link to="/">Voltar para a home</Link>
              </Button>
            }
          />
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-6">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="p-0">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge variant="premium">Premium</Badge>
                <Badge variant="secondary">{property.location.city}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Detalhe do imóvel
                </p>
                <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                  {property.title}
                </h1>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                {property.description}
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
                  <MapPin className="size-4" />
                  {property.location.neighborhood}, {property.location.city} - {property.location.state}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
                  <Ruler className="size-4" />
                  {formatArea(property.features.areaM2)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
                  <BedDouble className="size-4" />
                  {property.features.bedrooms} quartos
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
                  <Bath className="size-4" />
                  {property.features.bathrooms} banheiros
                </span>
              </div>
              <Separator />
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    title: "Valor",
                    value: formatCurrency(property.price),
                  },
                  {
                    title: "Área rural",
                    value: formatHectares(property.features.ruralAreaHectares),
                  },
                  {
                    title: "Atualização",
                    value: new Date(property.updatedAt).toLocaleDateString("pt-BR"),
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="mt-1 font-heading text-xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-border/70 bg-muted/20">
              <CardHeader>
                <CardTitle>Contato do anunciante</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <a href={`https://wa.me/${property.contactWhatsApp}`} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full">
                  <Star />
                  Favoritar anúncio
                </Button>
                <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                  A página já está estruturada para futura expansão com galeria, formulário,
                  mapa dedicado e agendamento.
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

