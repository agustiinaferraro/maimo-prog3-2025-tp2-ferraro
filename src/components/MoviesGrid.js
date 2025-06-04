import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';

const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4
     bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
      {movies.map((movie) => (
        <div key={movie.id} className="imgContainer">
          <Link href={`/movie/${movie.id}`}>
            <a>
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
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesGrid;
