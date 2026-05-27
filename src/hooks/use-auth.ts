import * as React from "react"

import { useAuthStore } from "@/stores/auth-store"

export function useAuth() {
  const session = useAuthStore((state) => state.session)
  const user = useAuthStore((state) => state.user)
  const status = useAuthStore((state) => state.status)
  const error = useAuthStore((state) => state.error)
  const clearSession = useAuthStore((state) => state.clearSession)
  const refreshSession = useAuthStore((state) => state.refreshSession)
  const signIn = useAuthStore((state) => state.signIn)
  const signUp = useAuthStore((state) => state.signUp)

  return React.useMemo(
    () => ({
      session,
      user,
      status,
      error,
      clearSession,
      refreshSession,
      signIn,
      signUp,
    }),
    [clearSession, error, refreshSession, session, signIn, signUp, status, user]
  )
}
