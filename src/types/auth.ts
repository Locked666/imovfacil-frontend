export type AppUserRole = "USER" | "BROKER" | "AGENCY" | "ADMIN"

export interface AppUser {
  id: string
  name: string
  email: string
  role: AppUserRole
  avatarUrl?: string | null
  organizationId?: string | null
}

export interface AppSession {
  user: AppUser
  expiresAt?: string | null
}

export interface SignInPayload {
  email: string
  password: string
}

export interface SignUpPayload extends SignInPayload {
  name: string
  phone?: string
  role?: Exclude<AppUserRole, "ADMIN">
}

