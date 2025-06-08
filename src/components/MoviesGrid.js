import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 

const MoviesGrid = ({ movies }) => {
  const router = useRouter();
  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-1">
      {movies.map((movie) => (
        <div key={movie.id} className="transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        onClick={() => handleMovieClick(movie.id)}>
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
