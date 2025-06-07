import Loading from "./Loading";
import Link from 'next/link';
import Image from "next/image";

const MovieContainer = ({ movie }) => {
    if (!movie) return <Loading />;
    const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`

  return (
    <div className="w-[80%] max-w-5xl mx-auto ">
      <Link href="/">
        <button className="text-7xl text-white py-6 hover:text-blue-500 active:text-blue-600">‹</button>
      </Link>
    
      <section style=
      {{backgroundImage: `url(${IMAGE_BASE}/${featuredMovie.backdrop_path})`,
      }} 
      className="flex flex-col md:flex-row items-center gap-6 py-6">

        <h2>{movie.original_title}</h2>

          <Image
            className="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            width={300} 
            priority
          />
          <ul className=" text-white py-6 px-6">
            <li><span className="text-7xl font-bold py-6">Fecha de estreno:</span> {movie.original_title}</li>
            <li><span className="text-1xl font-bold py-6">Fecha de estreno:</span> {movie.release_date}</li>
            <li><span className="text-1xl font-bold py-6">Idioma original:</span> {movie.original_language}</li>
            <li><span className="text-1xl font-bold py-6">Descripción:</span> {movie.overview}</li>
          </ul>
      </section>
    </div>

  );
};

export default MovieContainer