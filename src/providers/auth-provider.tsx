import * as React from "react"

import { setUnauthorizedHandler } from "@/services/api"
import { useAuthStore } from "@/stores/auth-store"

export function AuthProvider({ children }: React.PropsWithChildren) {
  const refreshSession = useAuthStore((state) => state.refreshSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  React.useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession()
    })

    void refreshSession()

    return () => {
      setUnauthorizedHandler(null)
    }
  }, [clearSession, refreshSession])

  return <>{children}</>
}
