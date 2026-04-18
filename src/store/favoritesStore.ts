import { atom } from 'nanostores';

//1. Obtener favoritos del Localstorange
const getInitialFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('liked-songs')
  return saved ? JSON.parse(saved) : [];
}

export const favoritesStore = atom<string[]>(getInitialFavorites());

//2. Funciones para alternar (Like/Unlike)
export const toggleFavorite = (songId: string) => {
  const current = favoritesStore.get();
  const isFavorite = current.includes(songId);

  const updated = isFavorite
    ? current.filter((id) => id !== songId)
    : [...current, songId];

  favoritesStore.set(updated);
  localStorage.setItem("liked-songs", JSON.stringify(updated));
}

