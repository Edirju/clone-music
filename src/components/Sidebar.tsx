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
    </nav>
  );
}

export default Sidebar;
