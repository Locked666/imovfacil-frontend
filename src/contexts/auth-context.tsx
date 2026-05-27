/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import { useAuthStore } from "@/stores/auth-store"

interface AuthContextValue {
  isReady: boolean
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const status = useAuthStore((state) => state.status)

  const value = React.useMemo<AuthContextValue>(
    () => ({
      isReady: status !== "idle" && status !== "loading",
    }),
    [status]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider")
  }

  return context
}
