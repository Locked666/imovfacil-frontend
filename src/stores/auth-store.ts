import { create } from "zustand"

import { getAuthSession, refreshAuthSession, signInWithEmail, signUpWithEmail } from "@/services/auth.service"
import type { AppSession, AppUser, SignInPayload, SignUpPayload } from "@/types/auth"

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated"

interface AuthState {
  session: AppSession | null
  user: AppUser | null
  status: AuthStatus
  error: string | null
  setSession: (session: AppSession | null, user?: AppUser | null) => void
  clearSession: () => void
  refreshSession: () => Promise<void>
  signIn: (payload: SignInPayload) => Promise<void>
  signUp: (payload: SignUpPayload) => Promise<void>
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  user: null,
  status: "idle",
  error: null,
  setSession: (session, user = session?.user ?? null) =>
    set({
      session,
      user,
      status: session ? "authenticated" : "unauthenticated",
      error: null,
    }),
  clearSession: () =>
    set({
      session: null,
      user: null,
      status: "unauthenticated",
      error: null,
    }),
  refreshSession: async () => {
    set({ status: "loading", error: null })

    try {
      const payload = await refreshAuthSession()

      set({
        session: payload.session,
        user: payload.user,
        status: payload.user ? "authenticated" : "unauthenticated",
        error: null,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao atualizar sessão"

      set({
        session: null,
        user: null,
        status: "unauthenticated",
        error: message,
      })
    }
  },
  signIn: async (payload: SignInPayload) => {
    set({ status: "loading", error: null })

    try {
      const sessionPayload = await signInWithEmail(payload)

      if (!sessionPayload.user) {
        throw new Error("Sessão não retornada pelo backend após login")
      }

      set({
        session: sessionPayload.session,
        user: sessionPayload.user,
        status: "authenticated",
        error: null,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha no login"
      set({ status: "unauthenticated", error: message })
      throw error
    }
  },
  signUp: async (payload: SignUpPayload) => {
    set({ status: "loading", error: null })

    try {
      const sessionPayload = await signUpWithEmail(payload)

      if (!sessionPayload.user) {
        throw new Error("Sessão não retornada pelo backend após cadastro")
      }

      set({
        session: sessionPayload.session,
        user: sessionPayload.user,
        status: "authenticated",
        error: null,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha no cadastro"
      set({ status: "unauthenticated", error: message })
      throw error
    }
  },
}))

export async function bootstrapAuthSession() {
  const session = await getAuthSession()

  if (session) {
    useAuthStore.getState().setSession(session)
    return session
  }

  useAuthStore.getState().clearSession()
  return null
}
