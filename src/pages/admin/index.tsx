import { BarChart3, Users } from "lucide-react"

import { SectionPage } from "@/components/common/section-page"
import { StatCard } from "@/components/common/stat-card"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminHomePage() {
  return (
    <SectionPage
      eyebrow="Admin"
      title="Administração da plataforma"
      description="Painel para governança geral de usuários, planos e métricas do marketplace."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Usuários totais" value="1.204" icon={<Users />} />
        <StatCard title="Métricas monitoradas" value="18" icon={<BarChart3 />} />
      </div>
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Estrutura inicial do admin separada do dashboard do tenant.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

