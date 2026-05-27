import { request } from "@/services/api"
import type { AppSession, AppUser, SignInPayload, SignUpPayload } from "@/types/auth"

type SessionResponse = AppSession | { session?: AppSession; user?: AppUser } | null

function resolveSession(payload: SessionResponse): AppSession | null {
  if (!payload) {
    return null
  }

  if ("user" in payload && payload.user) {
    return {
      user: payload.user,
      expiresAt: "expiresAt" in payload ? payload.expiresAt ?? null : null,
    }
  }

  if ("session" in payload && payload.session) {
    return payload.session
  }

  return null
}

export async function signInWithEmail(data: SignInPayload) {
  await request<unknown>("/auth/sign-in/email", {
    method: "POST",
    body: data,
  })

  return refreshAuthSession()
}

export async function signUpWithEmail(data: SignUpPayload) {
  await request<unknown>("/auth/sign-up/email", {
    method: "POST",
    body: data,
  })

  return refreshAuthSession()
}

export async function getAuthSession() {
  const payload = await request<SessionResponse>("/auth/session", {
    method: "GET",
  })

  return resolveSession(payload)
}

export async function getCurrentUser() {
  return request<AppUser>("/users/me", {
    method: "GET",
  })
}

export async function refreshAuthSession() {
  let resolvedSession: AppSession | null = null

  try {
    resolvedSession = await getAuthSession()
  } catch (error) {
    const status = error instanceof Error && "status" in error ? Number((error as { status?: number }).status) : null

    if (status === 401 || status === 403) {
      return {
        session: null,
        user: null,
      }
    }

    throw error
  }

  if (!resolvedSession) {
    return {
      session: null,
      user: null,
    }
  }

  let resolvedUser: AppUser | null = null

  try {
    resolvedUser = await getCurrentUser()
  } catch (error) {
    const status = error instanceof Error && "status" in error ? Number((error as { status?: number }).status) : null

    if (status !== 401 && status !== 403) {
      throw error
    }
  }

  return {
    session: resolvedSession,
    user: resolvedUser ?? resolvedSession?.user ?? null,
  }
}
