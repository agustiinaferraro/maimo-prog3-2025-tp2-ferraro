import Loading from "./Loading";
import Link from 'next/link';
import Image from "next/image";

const MovieContainer = ({ movie }) => {
    if (!movie) return <Loading />;

  return (
    <div className="w-[80%] max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 py-6">
       <Link href="/">
        <button className="text-5xl text-white py-6">‹</button>
      </Link>
      <h2>{movie.original_title}</h2>

        <Image
          className="img"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          width={300} 
          priority
        />
        <ul className="text-1xl text-white py-6 px-6">
          <li><span className="font-bold">Fecha de estreno:</span> {movie.release_date}</li>
          <li><span className="font-bold">Idioma original:</span> {movie.original_language}</li>
          <li><span className="font-bold">Descripción:</span> {movie.overview}</li>
        </ul>

    </div>
  );
};

export default MovieContainer