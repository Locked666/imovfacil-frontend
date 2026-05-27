const env = import.meta.env

export const appEnv = {
  apiUrl: (env.VITE_API_URL as string | undefined) ?? "http://localhost:3000/api/v1",
  mapboxToken: (env.VITE_MAPBOX_TOKEN as string | undefined) ?? "",
  appName: (env.VITE_APP_NAME as string | undefined) ?? "ImovFacil Marketplace",
  appEnv: (env.VITE_APP_ENV as string | undefined) ?? "development",
} as const

