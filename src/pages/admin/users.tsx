import { SectionPage } from "@/components/common/section-page"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminUsersPage() {
  return (
    <SectionPage
      eyebrow="Admin"
      title="Usuários"
      description="Gerenciamento inicial de usuários e permissões."
    >
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          A lista de usuários ficará conectada ao backend quando o contrato estiver definido.
        </CardContent>
      </Card>
    </SectionPage>
  )
}

