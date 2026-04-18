import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { searchSongs } from "@/services/musicService";
import { SongCard } from "./SongCard";
import { SongCardSkeleton } from "./ui/Skeleton";
import { set } from "astro:schema";


export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si el usuario borra la busqueda, limpiamos los resultados
    if (query.trim().length === 0) {
      setResults([]);
      setLoading(false)
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if ( query.length > 2 ) {
        setLoading(true);
        const data = await searchSongs(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    },400) // Debounce de 300ms para evitar buscar demasiado a la vez
    return () => clearTimeout(delayDebounceFn);
  },[query])

  return (
    <div className="flex flex-col gap-8">
      {/* Barra de Busqueda */}
      <div className="relative max-w-md group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-white transition-colors">
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <SearchIcon size={20} />
          )}
        </div>
        <input
          type="text"
          placeholder="¿Qué quieres escuchar?"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 border-none rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-400 outline-none ring-1 ring-transparent focus:ring-white transition-all "
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {loading ? (
          // Mientras carga los resultados, mostramos una lista de skeletons
          <>
            <SongCardSkeleton />
            <SongCardSkeleton />
            <SongCardSkeleton />
            <SongCardSkeleton />
            <SongCardSkeleton />
          </>
        ) : (
          results.map((song) => (
            <SongCard key={song.id} song={song} songsList={results} />
          ))
        )}
      </div>

      {/* Vacío */}
      {query.length > 2 && results.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-xl font-medium text-white mb-2 tracking-tight">
            No se encontraron resultados para '{query}'...
          </h3>
          <p className="text-zinc-400 font-light tracking-tighter [&>strong]:font-medium">
            Asegúrate de que las <strong>palabras estén bien escritas</strong> o
            intenta con menos <strong>palabras clave</strong>.
          </p>
        </div>
      )}
    </div>
  );
}




