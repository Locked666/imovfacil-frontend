export interface Organization {
  id: string
  name: string
  slug: string
  plan: string
  logoUrl?: string | null
  city?: string | null
  state?: string | null
}

