import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesState {
  favoritePropertyIds: string[]
  toggleFavorite: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritePropertyIds: [],
      toggleFavorite: (propertyId) =>
        set((state) => {
          const exists = state.favoritePropertyIds.includes(propertyId)

          return {
            favoritePropertyIds: exists
              ? state.favoritePropertyIds.filter((id) => id !== propertyId)
              : [...state.favoritePropertyIds, propertyId],
          }
        }),
      isFavorite: (propertyId) => get().favoritePropertyIds.includes(propertyId),
    }),
    {
      name: "imovfacil-favorites",
    }
  )
)

