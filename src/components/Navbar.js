import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    
    <div className='flex justify-between items-center text-white px-4 py-2 bg-gradient-to-r from-black to-transparent'>
        <div>
        <Image src="/assets/logo.jpg" alt="banner" width={50} height={50} className="h-[50px] object-cover rounded-full"/>
          
        </div>

        <nav> 
            <ul className="flex gap-6">
              <li>
                <Link href="/">Home</Link>
              </li>                
              <li>Generos</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar