import React from 'react'

const Navbar = () => {
  return (
    
    <div className='flex justify-between items-center mb-4 bg-sky-600 lg:bg-lime-600'>
        <div>Logo</div>

        <nav> 
            <ul>
                <li>Home</li>
                <li>Generos</li>
                
            </ul>
        </nav>
    </div>
  )
}

export default Navbar