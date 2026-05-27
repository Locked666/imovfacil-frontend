import { Link, Outlet } from "react-router-dom"
import { MapPinned, ShieldCheck, Sparkles } from "lucide-react"

import { AppLogo } from "@/components/common/app-logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <AppLogo />
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" asChild>
              <Link to="/explorar">Explorar</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Criar conta</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-3 text-sm text-muted-foreground lg:grid-cols-3 lg:px-6">
          <div className="flex items-center gap-2">
            <MapPinned className="size-4" />
            Mapa inteligente com pins e clusterização
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            Experiência premium para imóveis urbanos e rurais
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4" />
            Multi-tenant com sessão segura via cookies HTTP-only
          </div>
        </div>
      </div>
      <Separator />
      <Outlet />
    </div>
  )
}

