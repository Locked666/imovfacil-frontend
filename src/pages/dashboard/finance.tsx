import { SectionPage } from "@/components/common/section-page"
import { StatCard } from "@/components/common/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, CreditCard, Receipt } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"

export default function DashboardFinancePage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Financeiro"
      description="Preparado para assinatura, cobrança e impulsionamento no futuro."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Faturamento" value={formatCurrency(324000)} icon={<Wallet />} />
        <StatCard title="Assinaturas" value="128" icon={<CreditCard />} />
        <StatCard title="Faturas abertas" value="14" icon={<Receipt />} />
      </div>
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Espaço reservado para a camada financeira do MVP, sem adicionar backend novo.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

