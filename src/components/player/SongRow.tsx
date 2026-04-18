import React from 'react'
import { Play, Pause } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { playerStore, setIsPlaying, setCurrentSong } from '@/store/playerStore'

interface Props {
  song: any
  index: number
  songsList: any[]
}

export const SongRow = ({song, index, songsList}: Props) => {
  const { isPlaying, currentSong } = useStore(playerStore)
  const isThisSong = currentSong?.id === song.id
  const isThisPlaying = isThisSong && isPlaying

  const handlePlay = () => {
    if (isThisSong) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong({
        id: song.id,
        title: song.title,
        artist: song.artists?.name || 'Artista',
        image: song.image_url,
        url: song.song_url,
        duration: song.duration,
      }, songsList)
    }
  }

  return (
    <div onClick={handlePlay} className="group grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_4fr_3fr_auto] gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors items-center cursor-default ">
      {/*  Índice / Icono Play */}
      <div className="flex items-center justify-center w-4">
        {isThisPlaying ? (
          <img
            src="/assets/uploading-loop.svg"
            alt="playing"
            className="size-3"
          />
        ) : (
          <>
            <span className={`text-sm group-hover:hidden ${isThisSong ? 'text-green-500' : 'text-zinc-400'}`}>
              {index + 1}
            </span>
            <button onClick={handlePlay} className="hidden group-hover:block text-white">
              {isThisPlaying ? (
                <Pause fill="currentColor" size={16} />
              ) : (
                <Play fill="currentColor" size={16} />
              )}
            </button>
          </>
        )}
      </div>

      {/* Info Principal */}
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={song.image_url}
          alt={song.title}
          className="size-10 rounded shadow-lg"
        />
        <div className="flex flex-col overflow-hidden">
          <span className={`text-sm font-medium truncate ${isThisSong ? 'text-green-500' : 'text-white'}`}>
            {song.title}
          </span>
          <span className="text-xs text-zinc-400 truncate group-hover:text-white transition-colors">
            {song.artists?.name}
          </span>
        </div>
      </div>

      {/* Columna extra para desktop (Álbum - Género) */}
      <div className="hidden md:flex items-center">
        <span className="text-sm text-zinc-400">{song.genre || 'Single'}</span>
      </div>

      {/* Duración */}
      <div className="flex items-center text-zinc-400 text-xs font-mono">
        {song.duration}
      </div>


    </div>
  );
}
