import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Filter, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { defaultPropertyFilters, useFilterStore } from "@/stores/filter-store"
import type { PropertyFilters } from "@/types/property"

const filterSchema = z.object({
  purpose: z.union([z.literal("both"), z.literal("sale"), z.literal("rent")]),
  category: z.union([
    z.literal("all"),
    z.literal("house"),
    z.literal("apartment"),
    z.literal("farm"),
    z.literal("land"),
    z.literal("commercial"),
    z.literal("rural"),
  ]),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  minPrice: z.number().nullable(),
  maxPrice: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  areaMin: z.number().nullable(),
  ruralResources: z.array(z.string()),
})

type FilterFormValues = z.infer<typeof filterSchema>

const ruralResourceOptions = [
  "Represa",
  "Nascente",
  "Riacho",
  "Georreferenciamento",
  "Energia trifásica",
]

function toFormValues(filters: PropertyFilters): FilterFormValues {
  return {
    ...filters,
    city: filters.city ?? "",
    state: filters.state ?? "",
    neighborhood: filters.neighborhood ?? "",
    ruralResources: filters.ruralResources ?? [],
  }
}

interface FilterPanelProps {
  onApply?: (filters: PropertyFilters) => void
}

export function FilterPanel({ onApply }: FilterPanelProps) {
  const filters = useFilterStore((state) => state.filters)
  const updateFilters = useFilterStore((state) => state.setFilters)
  const resetFilters = useFilterStore((state) => state.resetFilters)

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: toFormValues(filters),
  })

  React.useEffect(() => {
    form.reset(toFormValues(filters))
  }, [filters, form])

  const onSubmit = form.handleSubmit((values) => {
    const normalized: PropertyFilters = {
      ...values,
      city: values.city.trim(),
      state: values.state.trim(),
      neighborhood: values.neighborhood.trim(),
      minPrice: values.minPrice ?? null,
      maxPrice: values.maxPrice ?? null,
      bedrooms: values.bedrooms ?? null,
      bathrooms: values.bathrooms ?? null,
      areaMin: values.areaMin ?? null,
      ruralResources: values.ruralResources,
    }

    updateFilters(normalized)
    onApply?.(normalized)
  })

  const handleReset = () => {
    resetFilters()
    form.reset(defaultPropertyFilters)
    onApply?.(defaultPropertyFilters)
  }

  const ruralResources = useWatch({
    control: form.control,
    name: "ruralResources",
  }) ?? []

  return (
    <Card className="h-full border-border/70 bg-background/95 shadow-sm">
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Filter className="size-4" />
          Filtros avançados
        </CardTitle>
        <CardDescription>
          Ajuste a busca para imóveis urbanos, rurais e comerciais.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="purpose">Tipo</Label>
          <Select id="purpose" {...form.register("purpose")}>
            <option value="both">Venda e locação</option>
            <option value="sale">Venda</option>
            <option value="rent">Locação</option>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Categoria</Label>
          <Select id="category" {...form.register("category")}>
            <option value="all">Todas</option>
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="farm">Fazenda</option>
            <option value="land">Terreno</option>
            <option value="commercial">Comercial</option>
            <option value="rural">Rural</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" placeholder="Cuiabá" {...form.register("city")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" placeholder="MT" maxLength={2} {...form.register("state")} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" placeholder="Centro, Jardim..." {...form.register("neighborhood")} />
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="minPrice">Valor mínimo</Label>
            <Input
              id="minPrice"
              type="number"
              min={0}
              placeholder="0"
              {...form.register("minPrice", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="maxPrice">Valor máximo</Label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              placeholder="0"
              {...form.register("maxPrice", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="bedrooms">Quartos</Label>
            <Input
              id="bedrooms"
              type="number"
              min={0}
              {...form.register("bedrooms", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bathrooms">Banheiros</Label>
            <Input
              id="bathrooms"
              type="number"
              min={0}
              {...form.register("bathrooms", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="areaMin">Área mínima</Label>
          <Input
            id="areaMin"
            type="number"
            min={0}
            placeholder="m²"
            {...form.register("areaMin", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
            })}
          />
        </div>
        <Separator />
        <div className="grid gap-3">
          <Label>Recursos rurais</Label>
          <div className="grid gap-2 rounded-xl border border-border bg-muted/20 p-3">
            {ruralResourceOptions.map((option) => {
              const checked = ruralResources.includes(option)

              return (
                <label key={option} className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={checked}
                    onChange={(event) => {
                      const nextResources = event.target.checked
                        ? [...ruralResources, option]
                        : ruralResources.filter((resource) => resource !== option)

                      form.setValue("ruralResources", nextResources, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                  {option}
                </label>
              )
            })}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button className="flex-1" onClick={onSubmit} type="button">
            Aplicar filtros
          </Button>
          <Button variant="outline" size="icon-sm" onClick={handleReset} type="button" aria-label="Limpar filtros">
            <RotateCcw />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
