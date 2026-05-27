import { SectionPage } from "@/components/common/section-page"
import { StatCard } from "@/components/common/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, PhoneCall, Users } from "lucide-react"

export default function DashboardLeadsPage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Leads"
      description="Visão inicial dos contatos recebidos para acompanhamento comercial."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Leads novos" value="89" icon={<MessageSquare />} />
        <StatCard title="Contatos por WhatsApp" value="212" icon={<PhoneCall />} />
        <StatCard title="Oportunidades ativas" value="31" icon={<Users />} />
      </div>
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Tabela e filtros de leads serão conectados aos endpoints do backend quando disponíveis.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

