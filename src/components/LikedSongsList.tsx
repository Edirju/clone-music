import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { favoritesStore } from "@/store/favoritesStore";
import { getSongs } from "@/services/musicService";
import { SongRow } from "./player/SongRow";
import { Clock3, Loader2 } from "lucide-react";

export const LikedSongsList = () => {
  const likedIds = useStore(favoritesStore);
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSongs().then((data) => {
      setAllSongs(data);
      setLoading(false);
    });
  }, []);

  // Filtramos las canciones que están en el store de favoritos
  const likedSongs = allSongs.filter((song) => likedIds.includes(song.id));

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-zinc-500" size={40} />
      </div>
    );
  }

  if (likedSongs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <p className="text-xl font-medium">
          Las canciones que te gusten aparecerán aquí
        </p>
        <a
          href="/"
          className="mt-4 px-6 py-2 bg-white text-black rounded-full font-bold hover:scale-105 transition"
        >
          Explorar canciones
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Encabezado de la tabla idéntico al de Artista */}
      <div className="grid grid-cols-[16px_4fr_3fr_auto] gap-4 px-4 py-2 text-zinc-400 text-xs font-bold border-b border-white/5 mb-4 uppercase tracking-widest">
        <span>#</span>
        <span>Título</span>
        <span className="hidden md:block">Álbum / Género</span>
        <span className="flex justify-end">
          <Clock3 size={16} />
        </span>
      </div>

      <div className="flex flex-col">
        {likedSongs.map((song, index) => (
          <SongRow
            key={song.id}
            song={song}
            index={index}
            songsList={likedSongs} // Pasamos la lista de favoritos para la cola de reproducción
          />
        ))}
      </div>
    </div>
  );
};