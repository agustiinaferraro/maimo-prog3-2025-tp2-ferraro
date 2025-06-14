'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'

const FavoritesContainer = () => {
  const { favorites, handleAddToFavorites, deleteToFavorites } = useAppContext();

  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10'>
        {favorites.map((movie) => {
          const isFavorite = favorites.some(fav => fav.id === movie.id);

          return (
            <div className='py-5' key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                alt={movie.title}
                width={400}
                height={200}
                style={{ borderRadius: '4px' }}
              />

              <h2 className='text-white mt-2'>{movie.title}</h2>

              <div className="flex justify-end">
                {isFavorite ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteToFavorites(movie.id);
                    }}
                    className="text-2xl text-white px-2 py-1"
                  >
                    ⭐
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToFavorites(movie.title, movie.backdrop_path, movie.id);
                    }}
                    className="text-3xl text-white px-2 py-1"
                  >
                    ☆
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesContainer;
