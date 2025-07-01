'use client'

import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppContext";
import { useState } from "react";

const Navbar = () => {
  const { favoritesQty, searchTerm, setSearchTerm } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r py-4 from-black to-transparent text-white px-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <div>
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="h-[50px] object-cover rounded-full"
            />
          </div>
        </Link>

        {/*boton hamburguesa solo en mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              //icono para cerrar
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // icono menu
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/*menu principal - oculto en mobile, visible en desktop */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex gap-6 text-white">
            <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
              <Link href="/favorites">Favorites</Link>
            </li>
            <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
              <Link href="/generos">Generos</Link>
            </li>
          </ul>

          <div className="ml-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar películas..."
              className="p-2 rounded-md border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </nav>

        {/*favorites contador visible siempre */}
        <div className="hidden md:block pr-10">
          <p>Favorites: {favoritesQty()}</p>
        </div>
      </div>

      {/*menu hamburguesa visible unicamente si isopen es true*/}
      {isOpen && (
        <nav className="md:hidden mt-4 px-2 pb-4 border-t border-gray-700">
          <ul className="flex flex-col gap-4 text-white">
            <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
              <Link href="/favorites" onClick={() => setIsOpen(false)}>
                Favorites
              </Link>
            </li>
            <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
              <Link href="/generos" onClick={() => setIsOpen(false)}>
                Generos
              </Link>
            </li>
          </ul>

          <div className="mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar películas..."
              className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="mt-4 text-white">
            Favorites: {favoritesQty()}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;