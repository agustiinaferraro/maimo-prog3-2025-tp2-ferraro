'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'
import Link from 'next/link' 

const FavoritesContainer = () => {
  const { favorites, deleteToFavorites } = useAppContext();

  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-10'>
        {favorites.map((movie) => {
          const title = movie.title || "Sin título";
          const image = movie.image;

          return (
            <Link href={title ? `/tv/${movie.id}` : `/movie/${movie.id}`} key={movie.id}>
              <div className='py-5 cursor-pointer'>
                {image ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt={title}
                    width={400}
                    height={200}
                    style={{ borderRadius: '4px' }}
                  />
                ) : (
                  <div className="bg-gray-700 text-white p-10 rounded-md w-[400px] h-[200px] flex items-center justify-center">
                    Imagen no disponible
                  </div>
                )}

                <h2 className='text-white'>{title}</h2>

                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // evitar navegación al hacer click en el botón
                      deleteToFavorites(movie.id);
                    }}
                    className="text-2xl text-white text-right px-2 py-1 cursor-pointer"
                  >
                    ⭐
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesContainer;