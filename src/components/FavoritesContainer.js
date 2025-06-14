'use client'

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'
import Link from 'next/link' 

const FavoritesContainer = () => {
  // obitiene favoritos y funciones para agregar/eliminar del contexto
  const { favorites, deleteToFavorites } = useAppContext();


  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-10'>
        {/* Mapear favoritos para mostrarlos */}
        {favorites.map((movie) => {
          const favoriteTitle = movie.title || movie.name || movie.original_title || "Sin título";
          console.log("Favorito con imagen:", movie.image); // Debug para ver imágenes guardadas

          return (
            // Link para que al hacer click en la peli navegue a MovieContainer
            <Link href={`/movie/${movie.id}`} key={movie.id} passHref>
              <div 
                className='py-5 cursor-pointer' // Hacer cursor pointer para indicar clickeable
              >
                {/* Validar que la imagen exista, sino mostrar mensaje */}
                {movie.image ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                    alt={favoriteTitle}
                    width={400}
                    height={200}
                    style={{ borderRadius: '4px' }}
                  />
                ) : (
                  <div className="bg-gray-700 text-white p-10 rounded-md w-[400px] h-[200px] flex items-center justify-center">
                    Imagen no disponible
                  </div>
                )}

                <h2 className='text-white'>{favoriteTitle}</h2>

                {/* Boton para eliminar de favoritos */}
                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // no navega cuando le hago click en el boton
                      deleteToFavorites(movie.id); // Eliminar de favoritos
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