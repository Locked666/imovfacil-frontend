import { request } from "@/services/api"
import type { Organization } from "@/types/organization"

export async function listOrganizations() {
  return request<Organization[]>("/organizations/", {
    method: "GET",
  })
}

export async function switchOrganization(organizationId: string) {
  return request<Organization | null>("/organizations/switch", {
    method: "POST",
    body: {
      organizationId,
    },
  })
}

