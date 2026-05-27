import { SectionPage } from "@/components/common/section-page"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPlansPage() {
  return (
    <SectionPage
      eyebrow="Admin"
      title="Planos"
      description="Estrutura inicial para gerir planos e monetização."
    >
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Os cards de planos e regras comerciais serão conectados aos endpoints finais.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

