import { Outlet } from "react-router-dom"

import { AppLogo } from "@/components/common/app-logo"

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.1fr_0.9fr]">
      <aside className="relative hidden overflow-hidden border-r border-border bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.18),_transparent_45%),linear-gradient(160deg,_#111827_0%,_#0f172a_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill=%22none%22 stroke=%22rgba(255,255,255,0.08)%22 stroke-width=%221%22%3E%3Cpath d=%22M0 20H40%22/%3E%3Cpath d=%2220 0V40%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="relative z-10 flex flex-col gap-6">
          <AppLogo />
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              ImovFacil Marketplace
            </p>
            <h1 className="font-heading text-5xl font-semibold leading-tight">
              Uma vitrine premium para imóveis com foco em conversão.
            </h1>
            <p className="max-w-lg text-sm leading-6 text-white/70">
              Layouts limpos, mapa central, filtros avançados e suporte multi-tenant
              preparado para escalar com corretores e imobiliárias.
            </p>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4 text-sm text-white/75">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <strong className="block text-2xl text-white">01</strong>
            Autenticação segura
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <strong className="block text-2xl text-white">02</strong>
            Mapa interativo
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <strong className="block text-2xl text-white">03</strong>
            Operação multi-tenant
          </div>
        </div>
      </aside>
      <main className="flex items-center justify-center bg-background px-4 py-10 lg:px-10">
        <Outlet />
      </main>
    </div>
  )
}

