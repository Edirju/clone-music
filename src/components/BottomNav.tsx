import React from 'react'
import { Home, Search, Library, Music2 } from "lucide-react";

export const BottomNav = () => {
  return (
    <nav className="flex md:hidden bottom-0 left-0 right-0 justify-around items-center bg-black/80 backdrop-blur-md border-t border-white/10 px-6 py-3 z-50">
      <a
        href="/"
        className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors"
      >
        <Home size={24} />
        <span className="text-[10px]">Inicio</span>
      </a>

      <a
        href="/search"
        className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors"
      >
        <Search size={24} />
        <span className="text-[10px]">Buscar</span>
      </a>

      <a
        href="/artist"
        className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors"
      >
        <Music2 size={24} />
        <span className="text-[10px]">Artistas</span>
      </a>

      <div className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
        <Library size={24} />
        <span className="text-[10px]">Tu biblioteca</span>
      </div>
    </nav>
  );
}
