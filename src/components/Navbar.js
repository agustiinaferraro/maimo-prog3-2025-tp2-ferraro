'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {

  const {favoritesQty} = useAppContext()

  return (
    
    <div className='flex justify-between items-center text-white px-4 py-2 bg-gradient-to-r from-black to-transparent'>
        <Link href="/">
          <div>
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} className="h-[50px] object-cover rounded-full"/>
          </div>
        </Link>

        <nav> 
            <ul className="flex gap-6 px-10 text-white-600">              
              <li className=" hover:text-blue-500 active:text-blue-600">Generos</li>
              <li>
                <Link href="/favorites">Favorites</Link>
              </li>
            </ul>
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