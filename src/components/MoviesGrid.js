import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 
import { useRef } from "react"; // useRef para poder crear la referencia

const MoviesGrid = ({ movies }) => {

  const scrollLeft = () => {
    if (scrollRef.current) { 
      // scrollRef es una referencia para acceder al div, con current agarro al div
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); 
      // scrollBy mueve horizontalmente 300 px, el smooth hace una animación
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollRef = useRef(null); // referencia, inicialmente sin apuntar a nada (null)

  const router = useRouter();
  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative w-full"> {/* contenedor padre para poder posicionar las flechas */}
      
      {/* Flecha izquierda */}
      <button
        onClick={scrollLeft}
        className="cursor-pointer hover:text-blue-500 active:text-blue-600 absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10"
        aria-label="Scroll Left"
      >
        &#8592;
      </button>
          
      {/* Contenedor del scroll */}
      <div 
        ref={scrollRef} 
        className="overflow-x-auto scrollbar-hide px-1 mx-2 w-full" 
        style={{ whiteSpace: 'nowrap' }} 
        // whiteSpace nowrap para que los items no se bajen y mantengan fila única
      > 
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="inline-block min-w-[200px] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer align-top"
            // inline-block mantiene el tamaño fijo sin achicar con flexbox
            onClick={() => handleMovieClick(movie.id)}
          >
            <Image
              className="img h-[450px] object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width={300}
              priority
            />
            <div className="nombre">
              <ul>
                <li className="text-1xl text-white font-bold py-2">{movie.original_title}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={scrollRight}
        className="cursor-pointer hover:text-blue-500 active:text-blue-600 absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10"
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MoviesGrid;