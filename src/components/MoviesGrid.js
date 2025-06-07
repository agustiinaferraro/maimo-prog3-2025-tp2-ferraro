import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 

const MoviesGrid = ({ movies }) => {
  const router = useRouter();
  const handleMovieClick= () => {
    router.push(`/movie/${movies.id}`); //router es el objeto que maneja la navegacion y push cambia la ruta actual a la que se le pasa
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full mx-auto">
      {movies.map((movie) => (
        <div key={movie.id} className="transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        onClick={handleMovieClick}>
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
  );
};

export default MoviesGrid;
