import React from "react";
import { Home, Search, Library, Plus } from "lucide-react"
import { Biblioteca } from "@/components/Library"

const genres = ["Rock", "Pop", "Salsa", "Jazz"];

const Sidebar = () => {
  return (
    <nav className="flex flex-col flex-1 gap-2 custom-scrollbar">
      {/* Menú Superior */}
      <div className="bg-zinc-900 rounded-lg p-4">
        <ul className="space-y-4">
          <li>
            <a
              href="/"
              className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300 font-semibold tracking-tighter"
            >
              <Home className="size-6" />
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300 font-semibold tracking-tighter"
            >
              <Search className="size-6" />
              Buscar
            </a>
          </li>
        </ul>
      </div>

      {/* Biblioteca */}
      <Biblioteca />

      {/* <div className="bg-zinc-900 rounded-lg p-4 flex-1">
        <header className="flex justify-between items-center text-zinc-400 mb-4">
          <div className="flex gap-2 items-center hover:text-white cursor-pointer transition-colors font-semibold tracking-tighter">
            <Library className="size-6" />
            Tu biblioteca
          </div>
          <button className="hover:bg-zinc-800 p-1 rounded-full transition-colors duration-300">
            <Plus className="size-5" />
          </button>
        </header>

        <div className="text-zinc-500 text-sm flex flex-col gap-2 mt-4">
          {genres.map((genre) => (
            <a
              key={genre}
              href={`/playlist/${genre}`}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              Playlist: {genre}
            </a>
          ))}
        </div>

      </div> */}
    </nav>
  );
}

export default Sidebar;
