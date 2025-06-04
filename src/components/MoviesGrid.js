import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';

const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {movies.map((movie) => (
        <div key={movie.id} className="imgContainer">
          <Link href={`/movie/${movie.id}`}>
            <a>
              <h2>{movie.title}</h2>
              <Image
                className="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                width={300}
                priority
              />
              <div className="nombre">
                <ul>
                  <li>{movie.original_title}</li>
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
