'use client'

import Loading from "./Loading";
import Image from 'next/image';
import { useRouter } from "next/navigation"; 
import { useRef, useEffect, useState } from "react"; // useRef para la referencia del contenedor y useState para controlar el scroll
import { useAppContext } from "@/app/context/AppContext";

const MoviesGrid = ({ movies, useBackdrop = true }) => {
 const {handleAddtoFavorites} = useAppContext()
  const scrollRef = useRef(null); // referencia al contenedor scrollable
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // arranca en true porque hay contenido

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 por precisión
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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const router = useRouter();
  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  };

  

  return (
    <div className="relative w-full"> {/* contenedor padre para posicionar flechas */}

      {/* Flecha izquierda con sombra negra y deshabilitada si no se puede scrollear */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
         className={`hidden sm:flex absolute left-0 top-0 bottom-0 z-10 w-12 items-center justify-center 
         text-white hover:bg-black/30 transition-opacity duration-300 
          ${canScrollLeft ? "hover:bg-black/30" : "opacity-20 cursor-default"}`}
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
        }}>
        {movies.map((movie) => (
          <div key={movie.id}
            className="min-w-[250px] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <Image
              className={`${useBackdrop ? "h-[225px] w-[400px]" : "h-[00px] w-[350px]"} object-cover rounded-md`}
              src={`https://image.tmdb.org/t/p/w500${useBackdrop ? movie.backdrop_path : movie.poster_path}`}
              alt={movie.original_title}
              width={useBackdrop ? 400 : 350}
              height={useBackdrop ? 225 : 400}
              priority
            />
            <div className="nombre">
              <ul>
                <li className="text-1xl text-white font-bold py-2">{movie.original_title}</li>
              </ul>
              
              <button>
                {/*verificar el image aca*/}
                onClick = {() => handleAddtoFavorites (movie.title, movie.poster_path, movie.id)}
                Add to favorites
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha derecha con sombra negra y deshabilitada si no se puede scrollear */}
      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
       className={`hidden sm:flex absolute right-0 top-0 bottom-0 z-10 w-12 items-center justify-center 
       text-white hover:bg-black/50 transition-opacity duration-300 
       ${canScrollRight ? "hover:bg-black/50" : "opacity-20 cursor-default"}`}
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MoviesGrid;