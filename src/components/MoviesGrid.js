'use client'

import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

const MoviesGrid = ({ movies, useBackdrop = true }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites } = useAppContext();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  //const date = movie.release_date || movie.first_air_date || "Fecha no disponible";

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    scrollEl.addEventListener('scroll', checkScroll);
    return () => scrollEl.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`hidden sm:flex absolute left-0 top-0 bottom-0 z-10 w-12 items-center justify-center 
        text-white ${canScrollLeft ? "hover:bg-black/30" : "opacity-20 cursor-default"}`}
        aria-label="Scroll Left"
      >
        &#8592;
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 py-2 no-scrollbar w-full"
        style={{
          touchAction: 'pan-x',
          overscrollBehaviorX: 'contain'
        }}
      >
        {movies.map((movie) => {
          const title = movie.original_title || movie.name || movie.original_name || "Sin título";

          const isFavorite = favorites.some(fav => fav.id === movie.id);
          const imagePath = useBackdrop ? movie.backdrop_path : movie.poster_path;

          return (
            <Link href={movie.first_air_date ? `/tv/${movie.id}` : `/movie/${movie.id}`} key={movie.id}>
              <div className="min-w-[250px] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer">
                <Image
                  className={`${useBackdrop ? "h-[225px] w-[400px]" : "h-[400px] w-[350px]"} object-cover rounded-md`}
                  src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                  alt={title}
                  width={useBackdrop ? 400 : 350}
                  height={useBackdrop ? 225 : 400}
                  priority
                />
                <div className="bg-black/60 p-2">
                  <ul>
                    <li className="text-1xl text-white font-bold py-2">
                      {title}
                    </li>

                  </ul>

                  <div className="flex justify-end">
                    {isFavorite ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteToFavorites(movie.id);
                        }}
                        className="text-2xl text-white text-right px-2 py-1 cursor-pointer"
                      >
                        ⭐
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Siempre pasar backdrop_path para que se guarde la imagen correcta en favoritos
                          handleAddToFavorites(title, movie.backdrop_path, movie.id);
                        }}
                        className="text-3xl text-white text-right px-2 py-1 cursor-pointer"
                      >
                        ☆
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`hidden sm:flex absolute right-0 top-0 bottom-0 z-10 w-12 items-center justify-center 
        text-white ${canScrollRight ? "hover:bg-black/50" : "opacity-20 cursor-default"}`}
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MoviesGrid;