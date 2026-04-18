import React from "react";
import { Play, Pause } from "lucide-react";
import { useStore } from "@nanostores/react";
import { playerStore, setCurrentSong, setIsPlaying } from "@/store/playerStore";
import { LikeButton } from "./LikeButton";

interface Song {
  id: string;
  title: string;
  artist?: string;
  image_url?: string;
  song_url: string;
  genre?: string;
  duration?: string;
}

interface Props {
  song: any;
  songsList: any[];
}

export const SongCard = ({ song, songsList }: Props) => {
  const { isPlaying, currentSong } = useStore(playerStore);
  //Verifica si la cancion es la que esta sonando
  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

  const handlePlay = (e: React.MouseEvent) => {
    //console.log('ID del artista en esta card:', song.artist_id);
    e.preventDefault(); // Evita que el click dispare otros eventos

    const artistName = song.artists?.name || "Artista Desconocido";

    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      // Transformar el formato de la DB al formato del Store
      setCurrentSong(
        {
          id: song.id,
          title: song.title,
          artist: song.artists?.name || "Desconocido", // Aquí iría song.artists.name si tuvieras la relación
          album: song.genre || "Álbum",
          duration: song.duration || "0:00",
          image:
            song.image_url ||
            "https://community.spotify.com/t5/image/serverpage/image-id/25294i283651CFA9829A05?v=v2", // URL de portada temporal
          url: song.song_url,
        },
        songsList,
      );
    }
  };

  return (
    <div className="group relative bg-zinc-500/5 hover:bg-zinc-500/10 p-4 rounded-md transition-all duration-300 shadow-md ">
      {/* Imagen de portada */}
      <div className="relative aspect-square mb-4 shadow-black/50 shadow-xl overflow-hidden rounded-lg">
        <img
          src={
            song.image_url ||
            "https://community.spotify.com/t5/image/serverpage/image-id/25294i283651CFA9829A05?v=v2"
          }
          alt={song.title}
          className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
        />
        {/* Botón de reproducción - Flotante */}
        <button
          onClick={handlePlay}
          className={` absolute bottom-3 right-3 p-3 rounded-full bg-green-500 text-black shadow-2xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 ${isThisSongPlaying ? "opacity-100 translate-y-0 bg-green-400" : ""} `}
        >
          {isThisSongPlaying ? (
            <Pause fill="currentColor" size={24} />
          ) : (
            <Play fill="currentColor" size={24} />
          )}
        </button>
      </div>

      {/* Textos */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`font-bold text-base tracking-tight truncate transition-colors duration-300 ${isThisSongPlaying ? "text-green-500" : "text-white"}`}
          >
            {song.title}
          </h3>
          <LikeButton songId={song.id} />
        </div>
        <p className="text-zinc-400 text-sm truncate capitalize tracking-tighter group-hover:text-zinc-300 transition-colors">
          {song.artist_id ? (
            <a
              href={`/artist/${song.artist_id}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline hover:underline-offset-2 hover:text-white transition-colors"
            >
              {song.artists?.name || "Desconocido"}
            </a>
          ) : (
            <span>{song.artists?.name || "Desconocido"}</span>
          )}
        </p>
      </div>
    </div>
  );
};

{
  /* {song.artist_id ? (
  <a
    href={`/artist/${song.artist_id}`}
    onClick={(e) => e.stopPropagation()}
    className="hover:underline hover:underline-offset-2 hover:text-white transition-colors"
  >
    {song.artists?.name || "Desconocido"}
  </a>
) : (
  <span>{song.artists?.name || "Desconocido"}</span>
)} */
}
{
  /* <a 
  href={`/artist/${song.artists.id}`}
  onClick={(e) => e.stopPropagation()} // Importante: para que no se dispare el evento de click en la navegación
  className="hover:underline hover:underline-offset-2 hover:text-white transition-colors"
>
  {
    song.artists?.name || "Desconocido"
  }
</a> */
}

{
  /* <a
            href=""
            onClick={(e) => e.stopPropagation()}
            className="hover:underline hover:underline-offset-2 hover:text-white transition-colors"
          >
            {song.artists?.name || "Desconocido"}
          </a> */
}
