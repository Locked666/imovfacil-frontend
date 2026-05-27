import * as React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useTenant } from "@/hooks/use-tenant"
import type { AppUserRole } from "@/types/auth"

function RouteLoader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="animate-spin" />
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === "idle" || status === "loading") {
    return (
      <RouteLoader
        title="Validando sessão"
        description="Aguardando a sessão HTTP-only do usuário."
      />
    )
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export function TenantGuard() {
  const { status, organizations, loadOrganizations } = useTenant()

  React.useEffect(() => {
    if (status === "idle" && organizations.length === 0) {
      void loadOrganizations()
    }
  }, [loadOrganizations, organizations.length, status])

  if (status === "loading" || status === "idle") {
    return (
      <RouteLoader
        title="Carregando tenant"
        description="Buscando a organização ativa para aplicar o header x-organization-id."
      />
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <EmptyState
          title="Nenhuma organização disponível"
          description="A resposta de organizações ainda não retornou dados válidos."
          action={<Button onClick={() => void loadOrganizations()}>Tentar novamente</Button>}
        />
      </div>
    )
  }

  return <Outlet />
}

export function RoleGuard({
  allowedRoles,
}: {
  allowedRoles: AppUserRole[]
}) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

