import { create } from "zustand"
import { persist } from "zustand/middleware"

import { listOrganizations, switchOrganization } from "@/services/organization.service"
import type { Organization } from "@/types/organization"

type TenantStatus = "idle" | "loading" | "ready" | "error"

interface TenantState {
  organizations: Organization[]
  activeOrganizationId: string | null
  status: TenantStatus
  error: string | null
  setOrganizations: (organizations: Organization[]) => void
  setActiveOrganizationId: (organizationId: string | null) => void
  loadOrganizations: () => Promise<Organization[]>
  switchTenant: (organizationId: string) => Promise<void>
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set, get) => ({
      organizations: [],
      activeOrganizationId: null,
      status: "idle",
      error: null,
      setOrganizations: (organizations) => {
        const activeOrganizationId =
          get().activeOrganizationId ?? organizations[0]?.id ?? null

        set({
          organizations,
          activeOrganizationId,
          status: "ready",
          error: null,
        })
      },
      setActiveOrganizationId: (organizationId) => {
        set({
          activeOrganizationId: organizationId,
          status: "ready",
          error: null,
        })
      },
      loadOrganizations: async () => {
        set({ status: "loading", error: null })

        try {
          const organizations = await listOrganizations()
          const activeOrganizationId =
            get().activeOrganizationId ?? organizations[0]?.id ?? null

          set({
            organizations,
            activeOrganizationId,
            status: "ready",
            error: null,
          })

          return organizations
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Falha ao carregar organizações"

          set({
            organizations: [],
            status: "error",
            error: message,
          })

          throw error
        }
      },
      switchTenant: async (organizationId) => {
        set({ status: "loading", error: null })

        try {
          await switchOrganization(organizationId)

          set({
            activeOrganizationId: organizationId,
            status: "ready",
            error: null,
          })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Falha ao trocar organização"

          set({
            status: "error",
            error: message,
          })

          throw error
        }
      },
    }),
    {
      name: "imovfacil-tenant",
      partialize: (state) => ({
        activeOrganizationId: state.activeOrganizationId,
      }),
    }
  )
)

