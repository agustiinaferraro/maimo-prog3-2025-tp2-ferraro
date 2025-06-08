import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 
import { useRef } from "react"; // useRef para poder crear la referencia

const MoviesGrid = ({ movies }) => {

  const scrollLeft = () => {
    if (scrollRef.current) { 
      // scrollRef es una referencia para acceder al div, con el current agarro al div, sin eso agarro una caja vacía
      // current es la propiedad de ref que permite acceder al objeto real (div en este caso)
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); 
      // scrollBy mueve horizontalmente 300 px, el smooth hace una animación
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollRef = useRef(null); // referencia, inicialmente sin apuntar a nada o sea null)

  const router = useRouter();
  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  };

  return (

    <div className="relative w-full group"> {/* contenedor padre para poder posicionar las flechas */}

      {/* Flecha izquierda sobre el contenido pero solo visible al hacer hover */}
      <button
        onClick={scrollLeft}
        className="hidden group-hover:flex items-center justify-center text-white absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 shadow-lg hover:scale-110 transition"
        aria-label="Scroll Left"
      >
        &#8592;
      </button>

      {/* Contenedor scroll con gap y ancho mínimo forzado para que las pelis no se achiquen */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 w-full"
        style={{ minWidth: `${movies.length * 220}px` }} // Fuerza el ancho min para que el contenedor sea más ancho que el padre y aparezca el scroll horizontal
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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

      {/* Flecha derecha sobre el contenido pero solo visible al hacer hover */}
      <button
        onClick={scrollRight}
        className="hidden group-hover:flex items-center justify-center text-white absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 shadow-lg hover:scale-110 transition"
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
      
    </div>
  );
};

export default MoviesGrid;