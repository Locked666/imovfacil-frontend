/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import { useTenantStore } from "@/stores/tenant-store"

interface TenantContextValue {
  hasTenant: boolean
}

const TenantContext = React.createContext<TenantContextValue | null>(null)

export function TenantContextProvider({ children }: React.PropsWithChildren) {
  const activeOrganizationId = useTenantStore((state) => state.activeOrganizationId)

  const value = React.useMemo<TenantContextValue>(
    () => ({
      hasTenant: Boolean(activeOrganizationId),
    }),
    [activeOrganizationId]
  )

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenantContext() {
  const context = React.useContext(TenantContext)

  if (!context) {
    throw new Error("useTenantContext must be used within TenantContextProvider")
  }

  return context
}
