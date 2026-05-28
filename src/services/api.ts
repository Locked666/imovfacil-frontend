import { appEnv } from "@/lib/env"
import { useTenantStore } from "@/stores/tenant-store"

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.payload = payload
  }
}

type QueryValue = string | number | boolean | null | undefined

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown
  headers?: HeadersInit
  query?: Record<string, QueryValue>
  skipTenantHeader?: boolean
}

type UnauthorizedHandler = (() => void) | null

let unauthorizedHandler: UnauthorizedHandler = null

export function setUnauthorizedHandler(handler: UnauthorizedHandler) {
  unauthorizedHandler = handler
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const baseUrl = appEnv.apiUrl.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = new URL(`${baseUrl}${normalizedPath}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined || value === "") {
        continue
      }

      url.searchParams.set(key, String(value))
    }
  }

  return url
}

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData
}

async function parsePayload(response: Response) {
  const contentType = response.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    return response.json()
  }

  const text = await response.text()
  return text.length > 0 ? text : null
}

export async function request<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, headers, query, skipTenantHeader, ...init } = options
  const url = buildUrl(path, query)
  const activeOrganizationId = useTenantStore.getState().activeOrganizationId
  const requestHeaders = new Headers(headers)

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json")
  }

  if (!requestHeaders.has("Origin")) {
    requestHeaders.set("Origin", appEnv.appOriginUrl)
  }

  if (!skipTenantHeader && activeOrganizationId) {
    requestHeaders.set("x-organization-id", activeOrganizationId)
  }

  let resolvedBody: BodyInit | undefined

  if (body !== undefined) {
    if (isFormData(body)) {
      resolvedBody = body
    } else {
      if (!requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json")
      }

      resolvedBody = JSON.stringify(body)
    }
  }

  const response = await fetch(url, {
    ...init,
    body: resolvedBody,
    credentials: "include",
    headers: requestHeaders,
  })

  const payload = await parsePayload(response)

  if (!response.ok) {
    if (response.status === 401) {
      unauthorizedHandler?.()
    }

    const message =
      (payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: string }).message ?? "Request failed")
        : response.statusText) || "Request failed"

    throw new ApiError(message, response.status, payload)
  }

  return payload as T
}
