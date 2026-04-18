import React, { useEffect, useState } from "react";
import { Library as LibraryIcon, Music, Plus } from "lucide-react";
import { getUniqueGenres } from "@/services/musicService";
import { Skeleton } from "./ui/Skeleton";

export const Biblioteca = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUniqueGenres().then(data => {
      setGenres(data);
      //setLoading(false);
      setTimeout(() => setLoading(false), 1000);
    })
  },[])

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex-1 flex flex-col overflow-hidden">
      <header className="flex justify-between items-center text-zinc-400 mb-4">
        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors font-semibold tracking-tighter">
          <LibraryIcon className="size-6" />
          Tu biblioteca
        </div>
        <button className="hover:bg-zinc-800 p-1 rounded-full transition-colors duration-300">
          <Plus className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex flex-col gap-3 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-12 shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <nav className="flex flex-col gap-1">
            {genres.map((genre) => (
              <a
                key={genre}
                href={`/playlist/${genre}`}
                className="group flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
              >
                <div className="size-10 bg-zinc-800 rounded flex items-center justify-center group-hover:bg-zinc-700 ">
                  <Music size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{genre}</span>
                  <span className="text-xs text-zinc-500 tracking-tighter">
                    Playlist por género
                  </span>
                </div>
              </a>
            ))}
            <a
              href="/liked-songs"
              className="group flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
            >
              <div className="size-10 bg-zinc-800 rounded flex items-center justify-center group-hover:bg-zinc-700">
                <Music size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Me gustan</span>
                <span className="text-xs text-zinc-500 tracking-tighter">
                  Todos los géneros
                </span>
              </div>
            </a>
          </nav>
        )}
      </div>
    </div>
  );
}