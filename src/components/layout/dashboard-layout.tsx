import { Link, NavLink, Outlet } from "react-router-dom"
import {
  BarChart3,
  Building2,
  Cog,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  Users,
  Wallet,
} from "lucide-react"

import { AppLogo } from "@/components/common/app-logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useTenant } from "@/hooks/use-tenant"

const dashboardNav = [
  { to: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { to: "/dashboard/imoveis", label: "Imóveis", icon: Building2 },
  { to: "/dashboard/leads", label: "Leads", icon: Users },
  { to: "/dashboard/financeiro", label: "Financeiro", icon: Wallet },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: Cog },
]

const adminNav = [
  { to: "/admin", label: "Resumo", icon: BarChart3 },
  { to: "/admin/usuarios", label: "Usuários", icon: Users },
  { to: "/admin/planos", label: "Planos", icon: Receipt },
  { to: "/admin/metricas", label: "Métricas", icon: BarChart3 },
]

interface DashboardLayoutProps {
  scope?: "dashboard" | "admin"
}

export function DashboardLayout({ scope = "dashboard" }: DashboardLayoutProps) {
  const { user, clearSession } = useAuth()
  const { organizations, activeOrganizationId } = useTenant()
  const navItems = scope === "admin" ? adminNav : dashboardNav
  const activeOrganization = organizations.find((item) => item.id === activeOrganizationId)

  return (
    <div className="grid min-h-svh lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden border-r border-border bg-card/80 p-5 lg:flex lg:flex-col">
        <div className="flex items-center justify-between gap-4">
          <AppLogo />
          <Button variant="ghost" size="icon-sm" asChild>
            <Link to="/">
              <Menu />
            </Link>
          </Button>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Organização ativa
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">{activeOrganization?.name ?? "Sem organização"}</p>
              <p className="text-sm text-muted-foreground">
                {activeOrganization?.plan ?? "Plano não informado"}
              </p>
            </div>
            <Badge variant="secondary">Tenant</Badge>
          </div>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard" || item.to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <Icon className="size-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-border bg-muted/20 p-4">
          <p className="text-sm font-medium">{user?.name ?? "Usuário"}</p>
          <p className="text-xs text-muted-foreground">{user?.email ?? "Sem sessão"}</p>
          <Button variant="ghost" className="mt-3 w-full justify-start" onClick={clearSession}>
            <LogOut />
            Sair
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="border-b border-border bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {scope === "admin" ? "Admin" : "Dashboard"}
              </p>
              <h1 className="font-heading text-xl font-semibold">
                {activeOrganization?.name ?? "ImovFacil Marketplace"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/">Ver marketplace</Link>
              </Button>
              <Button size="icon-sm" variant="ghost">
                <Menu />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-muted/20 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

