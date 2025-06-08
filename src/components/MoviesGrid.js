import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 
import { useRef } from "react"; // useRef para poder crear la referencia

const MoviesGrid = ({ movies }) => {

  const scrollRef = useRef(null); // referencia, inicialmente sin apuntar a nada (o sea null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // scrollBy mueve horizontalmente 300 px, el smooth hace una animación
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
    // contenedor padre, relativo para posicionar las flechas; hover:group para que las flechas aparezcan al hacer hover
    <div className="relative w-full group">

      {/* Flecha izquierda, oculta por defecto y visible solo al hacer hover en el contenedor */}
      <button
        onClick={scrollLeft}
        className="hidden group-hover:flex items-center justify-center absolute left-0 top-1/2 transform -translate-y-1/2 text-white shadow-md hover:shadow-lg p-2 z-10 transition-opacity duration-300"
        aria-label="Scroll Left"
      >
        &#8592;
      </button>

      {/* Contenedor scrollable horizontalmente */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide"
      >
        {movies.map((movie) => (
          // cada película tiene ancho fijo para que no cambie con la cantidad
          <div
            key={movie.id}
            className="w-[200px] flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <Image
              className="img h-[450px] object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width={300}
              height={450}
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

      {/* Flecha derecha*/}
      <button
        onClick={scrollRight}
        className="hidden group-hover:flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2 text-white shadow-md hover:shadow-lg p-2 z-10 transition-opacity duration-300"
        aria-label="Scroll Right"
      >
        &#8594;
      </button>

    </div>
  );
};

export default MoviesGrid;