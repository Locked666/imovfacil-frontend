import { SectionPage } from "@/components/common/section-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardSettingsPage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Configurações"
      description="Ajustes iniciais de branding, sessão e operação do tenant."
    >
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Preferências da aplicação</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[
            "Sessão segura com cookies HTTP-only",
            "Tenant ativo persistido no frontend",
            "Tema e branding prontos para personalização",
            "Mapbox configurado via variável de ambiente",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </SectionPage>
  )
}
