import * as React from "react"

import { useAuthStore } from "@/stores/auth-store"
import { useTenantStore } from "@/stores/tenant-store"

export function TenantProvider({ children }: React.PropsWithChildren) {
  const authStatus = useAuthStore((state) => state.status)
  const loadOrganizations = useTenantStore((state) => state.loadOrganizations)
  const setActiveOrganizationId = useTenantStore(
    (state) => state.setActiveOrganizationId
  )
  const organizations = useTenantStore((state) => state.organizations)

  React.useEffect(() => {
    if (authStatus !== "authenticated") {
      return
    }

    void loadOrganizations()
  }, [authStatus, loadOrganizations])

  React.useEffect(() => {
    if (organizations.length === 0) {
      return
    }

    const activeOrganizationId = useTenantStore.getState().activeOrganizationId

    if (activeOrganizationId) {
      return
    }

    setActiveOrganizationId(organizations[0]?.id ?? null)
  }, [organizations, setActiveOrganizationId])

  return <>{children}</>
}

