import React from 'react'
import { Heart } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { favoritesStore, toggleFavorite } from '@/store/favoritesStore'

export const LikeButton = ({ songId }: { songId: string }) => {
  const favorites = useStore(favoritesStore)
  const isLiked = favorites.includes(songId)

  return (
    <button 
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(songId)
      }}
      className={`transition-all hover:scale-110 active:scale-90 ${isLiked ? 'text-green-500' : 'text-zinc-500'}`}
    >
      <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
    </button>
  )
}
