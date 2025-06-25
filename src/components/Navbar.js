'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {

  const {favoritesQty, searchTerm, setSearchTerm} = useAppContext()

  return (
    
    <div className='flex justify-between items-center text-white px-4 py-2 bg-gradient-to-r from-black to-transparent'>
        <Link href="/">
          <div>
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} className="h-[50px] object-cover rounded-full"/>
          </div>
        </Link>

        <nav> 
            <ul className="flex gap-6 px-10 text-white-600">              
              <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
                <Link href="/favorites">Favorites</Link>
              </li>
              
              <li className="hover:text-gray-300 active:text-white transition-colors duration-200">
                <Link href="/generos">Generos</Link>
              </li>

            </ul>

            <div className="w-full px-6 pt-6 flex justify-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                // e = evento, e.target es el elemento donde pasa el evento (input) y e.target.value es el texto que escribe el usuario
                // setSearchTerm actualiza el estado con ese texto

                placeholder="Buscar películas..."
                className="w-full max-w-md p-2 rounded-md border border-gray-300 text-white"
              />
            </div>


        </nav>

        <div>
          <p className="pr-10">
          {`Favorites: ${favoritesQty()}`}
          </p>
        </div>
    </div>
  )
}

export default Navbar