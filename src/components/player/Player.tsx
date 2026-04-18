import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { playerStore, setIsPlaying, setVolume, setCurrentSong, type Song } from "@/store/playerStore";
import { Play, Pause, Volume2, SkipBack, SkipForward, Heart } from "lucide-react";

// 1. Aseguramos el DEFAULT EXPORT para que Astro no falle al importar
const Player = () => {
  const { currentSong, isPlaying, volume } = useStore(playerStore);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Efecto para controlar Play / Pause
  
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Error al reproducir:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Efecto para cambio de canción
  
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentSong]);

  // Sincronizar volumen del store con el elemento audio

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const playNext = () => {
    const {songs, currentSong} = playerStore.get(); // Obtenemos el estado actual del store

    if (!currentSong || songs.length === 0) return;
    
    // Encontrar índice actual
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    
    // Calcular el siguiente índice (si es el último, vuelve al primero)
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];

    if (nextSong) {
      // Formateamos la canción al formato del reproductor (Coincidir con el SongCard)
      const formattedSong: Song = {
        id: nextSong.id,
        title: nextSong.title,
        artist: nextSong.artist || "Artista Desconocido",
        album: nextSong.genre || "Álbum",
        duration: nextSong.duration || "0:00",
        image: nextSong.image_url || nextSong.image || "https://community.spotify.com/t5/image/serverpage/image-id/25294i283651CFA9829A05?v=v2",
        url: nextSong.song_url || nextSong.url || "",
        genre: nextSong.genre
      }
      setCurrentSong(formattedSong, songs);
    }
  }

  // Si no hay canción, mostramos el reproductor vacío pero con estructura
  // Esto evita que el Layout "salte" o cambie de tamaño
  if (!currentSong) {
    return (
      <footer className="flex items-center justify-center h-20 bg-black border border-zinc-900/65 text-zinc-500 text-sm rounded-xl md:rounded-none md:border-none">
        Selecciona una canción para empezar a escuchar
      </footer>
    );
  }

  return (
    <div className="relative group">
      {/* Glow Efecto */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-green-500/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none "></div>

      {/* Contenido del Player */}
      <div className="relative flex flex-col justify-center items-center h-16 md:h-20 bg-zinc-900/95 md:bg-black backdrop-blur-xl md:backdrop-blur-none rounded-xl md:rounded-none px-4 py-3 shadow-2xl md:shadow-none border border-white/5 md:border-none overflow-hidden z-10">
        <div className="flex items-center justify-between w-full max-w-350 mx-auto relative">
          {/* Info */}
          <div className="flex items-center gap-3 md:gap-4 w-[70%] md:w-[30%]">
            <div className="size-10 md:size-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden shrink-0">
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="size-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold truncate text-white">
                {currentSong.title}
              </h4>
              <p className="text-xs truncate text-zinc-400">
                {currentSong.artist}
              </p>
            </div>
            <button className="hidden md:block text-zinc-400 hover:text-green-500 transition ml-2">
              <Heart size={18} />
            </button>
          </div>

          {/* Controles */}
          <div className="flex flex-col items-center flex-1 md:max-w-[45%] gap-1">
            <div className="flex items-center gap-5">
              <SkipBack
                size={20}
                className="hidden md:block text-zinc-400 hover:text-white cursor-pointer transition"
              />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white text-black p-2 rounded-full hover:scale-105 transition shadow-md"
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>
              <SkipForward
                size={20}
                className="hidden md:block text-zinc-400 hover:text-white cursor-pointer transition"
                onClick={playNext}
              />
            </div>
            {/* Barra de progreso */}
            <div className="hidden md:flex items-center gap-2 w-full text-[10px] text-zinc-400 font-mono">
              <span className="w-8 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  if (audioRef.current)
                    audioRef.current.currentTime = Number(e.target.value);
                }}
                className="flex-1 h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer accent-white"
              />
              <span className="w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control de Volumen: Desktop */}
          <div className="hidden md:flex items-center justify-end w-[30%] gap-2">
            <Volume2 size={18} className="text-zinc-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-1 accent-green-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Barra de progreso Móvil */}
        <div className="absolute bottom-0.75 left-4 right-4 h-0.5 bg-white/5 md:hidden rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-300 ease-out"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={() =>
            setCurrentTime(audioRef.current?.currentTime || 0)
          }
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={playNext}
        />
      </div>
    </div>
  );
};

export default Player;
