import { Star } from "lucide-react"
import { useFavoriteStore } from "@/store/useFavoriteStore.ts"
import {toast} from "sonner";

export const AddFavoriteButton = ({ id }: { id: string }) => {
    const { toggleFavorite, isFavorite } = useFavoriteStore()
    const active = isFavorite(id)

    return (
        <button onClick={() => {
            toggleFavorite(id)
            if (active) {
                toast.success("Removed from Favorites!")
            } else {
                toast.success("Added to Favorites!")
            }
        }} className="p-1 hover:opacity-70 transition-opacity">
            <Star size={16} fill={active ? "#facc15" : "none"} stroke={active ? "#facc15" : "currentColor" }  className="shrink-0 hover:fill-transparent hover:stroke-yellow-400 transition-all cursor-pointer" />
        </button>
    )
}