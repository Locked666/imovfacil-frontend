import * as React from "react"

import { AuthContextProvider } from "@/contexts/auth-context"
import { TenantContextProvider } from "@/contexts/tenant-context"
import { ThemeProvider } from "@/components/theme-provider"
import { AppQueryProvider } from "@/providers/query-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { TenantProvider } from "@/providers/tenant-provider"

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="imovfacil-theme">
      <AppQueryProvider>
        <AuthContextProvider>
          <AuthProvider>
            <TenantContextProvider>
              <TenantProvider>{children}</TenantProvider>
            </TenantContextProvider>
          </AuthProvider>
        </AuthContextProvider>
      </AppQueryProvider>
    </ThemeProvider>
  )
}
