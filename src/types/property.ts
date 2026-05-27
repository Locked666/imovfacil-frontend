export type PropertyPurpose = "sale" | "rent"
export type PropertyCategory =
  | "house"
  | "apartment"
  | "farm"
  | "land"
  | "commercial"
  | "rural"

export interface PropertyCoordinates {
  latitude: number
  longitude: number
}

export interface PropertyLocation {
  city: string
  state: string
  neighborhood: string
  address: string
  zipCode?: string
}

export interface PropertyFeatures {
  bedrooms: number
  bathrooms: number
  suites?: number
  parkingSpaces?: number
  areaM2: number
  ruralAreaHectares?: number
  waterResources?: string[]
  agriculturalPotential?: boolean
}

export interface PropertyListing {
  id: string
  slug: string
  title: string
  description: string
  purpose: PropertyPurpose
  category: PropertyCategory
  price: number
  premium: boolean
  imageUrl: string
  gallery: string[]
  location: PropertyLocation
  coordinates: PropertyCoordinates
  features: PropertyFeatures
  contactWhatsApp: string
  updatedAt: string
}

export interface PropertyFilters {
  purpose: "sale" | "rent" | "both"
  category: PropertyCategory | "all"
  city: string
  state: string
  neighborhood: string
  minPrice: number | null
  maxPrice: number | null
  bedrooms: number | null
  bathrooms: number | null
  areaMin: number | null
  ruralResources: string[]
}

export interface PropertyViewport {
  latitude: number
  longitude: number
  zoom: number
}

