import { Building2 } from "lucide-react"

import { appEnv } from "@/lib/env"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <Building2 />
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-sm font-semibold leading-none">
          {appEnv.appName}
        </span>
        <span className="text-xs text-muted-foreground">Marketplace imobiliário</span>
      </div>
    </div>
  )
}

