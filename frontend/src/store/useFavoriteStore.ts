import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
    favorites: string[]
    toggleFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (id) => {
                const favorites = get().favorites
                if (favorites.includes(id)) {
                    set({ favorites: favorites.filter(f => f !== id) })
                } else {
                    set({ favorites: [...favorites, id] })
                }
            },
            isFavorite: (id) => get().favorites.includes(id)
        }),
        { name: 'favorites' }
    )
)