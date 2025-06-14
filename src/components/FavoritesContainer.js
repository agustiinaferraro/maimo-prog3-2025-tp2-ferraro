'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'

const FavoritesContainer = () => {
  // Obtener favoritos y funciones para agregar/eliminar del contexto
  const { favorites, deleteToFavorites } = useAppContext();

  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-10'>
        {favorites.map((movie) => {
          console.log("Favorito con imagen:", movie.image); // Debug para ver imágenes guardadas

          return (
            <div className='py-5' key={movie.id}>
              {/* Validar que la imagen exista, sino mostrar mensaje */}
              {movie.image ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                  alt={movie.title}
                  width={400}
                  height={200}
                  style={{ borderRadius: '4px' }}
                />
              ) : (
                <div className="bg-gray-700 text-white p-10 rounded-md w-[400px] h-[200px] flex items-center justify-center">
                  Imagen no disponible
                </div>
              )}
              <h2 className='text-white'>{movie.title}</h2>

              {/* Botón para eliminar de favoritos */}
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