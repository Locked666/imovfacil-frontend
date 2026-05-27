import * as React from "react"

import { useTenantStore } from "@/stores/tenant-store"

export function useTenant() {
  const organizations = useTenantStore((state) => state.organizations)
  const activeOrganizationId = useTenantStore(
    (state) => state.activeOrganizationId
  )
  const status = useTenantStore((state) => state.status)
  const error = useTenantStore((state) => state.error)
  const setActiveOrganizationId = useTenantStore(
    (state) => state.setActiveOrganizationId
  )
  const loadOrganizations = useTenantStore((state) => state.loadOrganizations)
  const switchTenant = useTenantStore((state) => state.switchTenant)

  return React.useMemo(
    () => ({
      organizations,
      activeOrganizationId,
      status,
      error,
      setActiveOrganizationId,
      loadOrganizations,
      switchTenant,
    }),
    [
      activeOrganizationId,
      error,
      loadOrganizations,
      organizations,
      setActiveOrganizationId,
      status,
      switchTenant,
    ]
  )
}
