import Loading from "./Loading";
import Link from 'next/link';
import Image from "next/image";

const MovieContainer = ({ movie }) => {
    if (!movie) return <Loading />;

  return (
    <div className="peliculaDetalles">
      <h2>{movie.original_title}</h2>

        {movie.poster_path && (
          <Image
            className="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            width={300}
            height={450} // agregalo por si falta
            priority
          />
        )}

   
        <ul>
          <li>Fecha de estreno: {movie.release_date}</li>
          <li>Idioma original: {movie.original_language}</li>
          <li>Descripción: {movie.overview}</li>
        </ul>

      <Link href="/">
        <button className="btn-back">Volver</button>
      </Link>  
    </div>
  );
};

export default MovieContainer