import { useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { Building2, MapPin, Sparkles } from "lucide-react"

import { FilterPanel } from "@/components/filters/filter-panel"
import { PageShell } from "@/components/common/page-shell"
import { PropertyCard } from "@/components/property/property-card"
import { MapboxMap } from "@/components/map/mapbox-map"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useProperties } from "@/hooks/use-properties"
import { formatCurrency } from "@/lib/formatters"

export default function HomePage() {
  const { properties, filteredProperties, selectedPropertySlug, setSelectedPropertySlug, loadProperties } =
    useProperties()

  useEffect(() => {
    void loadProperties()
  }, [loadProperties])

  const selectedProperty = useMemo(
    () => filteredProperties.find((property) => property.slug === selectedPropertySlug) ?? filteredProperties[0] ?? null,
    [filteredProperties, selectedPropertySlug]
  )

  const selectedPropertyId = selectedProperty?.id ?? null

  const propertyCountLabel = `${filteredProperties.length.toLocaleString("pt-BR")} imóveis encontrados`

  return (
    <PageShell>
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-6">
        <Card className="border-border/70 bg-background/95 shadow-sm">
          <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="premium">Marketplace premium</Badge>
                <Badge variant="secondary">Multi-tenant</Badge>
                <Badge variant="outline">Mapbox GL JS</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                  Locação e venda com experiência geográfica premium.
                </h1>
                <p className="max-w-4xl text-sm leading-6 text-muted-foreground lg:text-base">
                  Estrutura split-view com filtros avançados, mapa inteligente e cards premium
                  para imóveis urbanos e rurais, mantendo a experiência clean e conversível.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
                  <Building2 className="size-4" />
                  {properties.length.toLocaleString("pt-BR")} ativos
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
                  <MapPin className="size-4" />
                  {selectedProperty?.location.city ?? "Cuiabá"} - {selectedProperty?.location.state ?? "MT"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
                  <Sparkles className="size-4" />
                  {propertyCountLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <p className="text-sm text-muted-foreground">Faixa destacada</p>
              <p className="font-heading text-3xl font-semibold text-foreground">
                {selectedProperty ? formatCurrency(selectedProperty.price) : "R$ 0"}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                  <Link to="/explorar">Explorar imóveis</Link>
                </Button>
                <Button asChild>
                  <Link to="/login">Acessar dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
          <aside className="xl:sticky xl:top-6 xl:h-[calc(100svh-9rem)]">
            <FilterPanel />
          </aside>

          <section className="flex min-w-0 flex-col gap-4">
            <MapboxMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(propertyId) => {
                const nextProperty = filteredProperties.find((property) => property.id === propertyId)

                if (nextProperty) {
                  setSelectedPropertySlug(nextProperty.slug)
                }
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Integração com listagem
                </p>
                <h2 className="font-heading text-xl font-semibold">
                  Seleção sincronizada entre mapa e cards
                </h2>
              </div>
              <Badge variant="outline">{filteredProperties.length} resultados</Badge>
            </div>
            <Separator />
          </section>

          <aside className="xl:sticky xl:top-6 xl:h-[calc(100svh-9rem)]">
            <Card className="h-full border-border/70 bg-background/95 shadow-sm">
              <CardContent className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Lista lateral
                    </p>
                    <h2 className="font-heading text-xl font-semibold">Imóveis em destaque</h2>
                  </div>
                  <Badge variant="secondary">{filteredProperties.length}</Badge>
                </div>
                <ScrollArea className="min-h-0 flex-1 pr-1">
                  <div className="flex flex-col gap-4">
                    {filteredProperties.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
                        Nenhum imóvel corresponde aos filtros ativos.
                      </div>
                    ) : (
                      filteredProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          active={property.slug === selectedProperty?.slug}
                          onSelect={(nextProperty) => setSelectedPropertySlug(nextProperty.slug)}
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>
        </div>

        <Card className="border-border/70 bg-background/95 shadow-sm">
          <CardContent className="grid gap-4 p-5 lg:grid-cols-3">
            {[
              {
                title: "Fluxo de leads",
                value: "WhatsApp + formulário",
                description: "CTA premium para conversão.",
              },
              {
                title: "Dados sincronizados",
                value: "Filtro + mapa + lista",
                description: "Visão única do marketplace.",
              },
              {
                title: "Escala multi-tenant",
                value: "x-organization-id",
                description: "Contexto organizacional pronto.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-1 font-heading text-lg font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
