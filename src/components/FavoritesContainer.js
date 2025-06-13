'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'

const FavoritesContainer = () => {
  const { favorites } = useAppContext()

  return (
    <div className='flex'>
      {favorites.map((movie) => (
        <div key={(movie.id)}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.image}`}
            alt={movie.title}
            width={400}
            height={200}
            style={{ borderRadius: '8px' }}
          />
          <h2 className='text-white'>{movie.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default FavoritesContainer
