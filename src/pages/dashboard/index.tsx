import { BarChart3, Building2, MessageSquare, Wallet } from "lucide-react"

import { SectionPage } from "@/components/common/section-page"
import { StatCard } from "@/components/common/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

export default function DashboardHomePage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Operação comercial e performance"
      description="Visão inicial para acompanhar imóveis, leads, financeiro e configuração do tenant."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Imóveis ativos" value="42" icon={<Building2 />} />
        <StatCard title="Leads do mês" value="318" icon={<MessageSquare />} />
        <StatCard title="Receita estimada" value={formatCurrency(245000)} icon={<Wallet />} />
        <StatCard title="Conversão" value="8,4%" icon={<BarChart3 />} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Resumo operacional</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              "Publicação com sessão segura via cookies HTTP-only.",
              "Tenant header `x-organization-id` aplicado automaticamente.",
              "Mapbox pronto para pins, clusterização e viewport inteligente.",
              "Arquitetura preparada para code splitting e guards de rota.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximos passos do MVP</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>1. Integrar endpoints de imóveis quando o backend expor o contrato.</p>
            <p>2. Ligar formulários do dashboard às mutações reais.</p>
            <p>3. Consolidar analytics e métricas de tenant.</p>
          </CardContent>
        </Card>
      </div>
    </SectionPage>
  )
}

