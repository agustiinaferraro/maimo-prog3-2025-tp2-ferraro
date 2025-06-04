import Image from "next/image"

const Navbar = () => {
  return (
    
    <div className='flex justify-between items-center text-white'>
        <div>
        <Image src="/assets/logo.jpg" alt="banner" width={50} height={50} className="h-[50px] object-cover rounded-full"/>
          
        </div>

        <nav> 
            <ul className="flex gap-6">
                <li>Home</li>
                <li>Generos</li>
                
            </ul>
        </nav>
    </div>
  )
}

export default Navbar