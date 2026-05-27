import { SectionPage } from "@/components/common/section-page"
import { StatCard } from "@/components/common/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Eye, MousePointerClick } from "lucide-react"

export default function AdminMetricsPage() {
  return (
    <SectionPage
      eyebrow="Admin"
      title="Métricas"
      description="Painel executivo com indicadores de marketplace."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Visualizações" value="24.8k" icon={<Eye />} />
        <StatCard title="Cliques" value="6.1k" icon={<MousePointerClick />} />
        <StatCard title="Engajamento" value="11%" icon={<BarChart3 />} />
      </div>
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Estrutura pronta para gráficos e tendências quando a fonte de dados existir.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

