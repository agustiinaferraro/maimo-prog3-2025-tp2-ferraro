'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'

const FavoritesContainer = () => {
  const { favorites, deleteToFavorites } = useAppContext();

  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10'>
        {favorites.map((movie) => {
          // Validar que backdrop_path exista
          const imageUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : '/fallback.jpg'; // O cualquier imagen de respaldo

          return (
            <div className='py-5' key={movie.id} style={{ width: 400 }}>
              {/* contenedor relativo y con tamaño fijo */}
              <div className="relative w-[400px] h-[225px] rounded-md overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={movie.title}
                  fill // para que la imagen llene el contenedor
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={true}
                  onError={(e) => {
                    e.currentTarget.src = '/fallback.jpg'; // fallback si falla
                  }}
                />
              </div>

              <h2 className='text-white mt-2'>{movie.title}</h2>

              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteToFavorites(movie.id);
                  }}
                  className="text-2xl text-white text-right px-2 py-1"
                >
                  ⭐
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesContainer;