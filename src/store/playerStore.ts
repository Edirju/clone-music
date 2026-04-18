import { atom } from 'nanostores';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  url: string;
  genre?: string;
  image_url?: string;
  song_url?: string;
  artists?: {
    name: string;
    image_url: string;
  };
}

export interface PlayerState {
  isPlaying: boolean;
  currentSong: Song | null;
  songs: Song[]; // Lista de canciones
  volume: number;
}

const getInitialVolume = () => {
  
  if (typeof window === 'undefined') return 0.5;

  const savedVolume = localStorage.getItem('player-volume')
  return savedVolume ? parseFloat(savedVolume) : 0.5;

}

export const playerStore = atom<PlayerState>({
  isPlaying: false,
  currentSong: null,
  songs: [], // Vacio
  volume: getInitialVolume(), // Volumen inicial
});

// Funciones para manipular el volumen
export const setVolume = (newVolume: number) => {
  playerStore.set({...playerStore.get(), volume: newVolume});
  localStorage.setItem('player-volume', newVolume.toString());
}

export const setIsPlaying = (playing: boolean) => {
  playerStore.set({ ...playerStore.get(), isPlaying: playing });
};

export const setCurrentSong = (song: any, songs: any[]) => {
  playerStore.set({ 
    ...playerStore.get(), 
    currentSong: song, 
    songs: songs, // Guardamos la lista completa
    isPlaying: true 
  });
};