import { Link } from "react-router-dom"

import { SectionPage } from "@/components/common/section-page"
import { PropertyCard } from "@/components/property/property-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProperties } from "@/hooks/use-properties"

export default function DashboardPropertiesPage() {
  const { properties } = useProperties()

  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Gestão de imóveis"
      description="Lista inicial para gestão de anúncios, com base em cards reutilizáveis."
      actions={
        <Button asChild>
          <Link to="/dashboard/imoveis/novo">Novo imóvel</Link>
        </Button>
      }
    >
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </CardContent>
      </Card>
    </SectionPage>
  )
}

