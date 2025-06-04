import Loading from "./Loading";
import Link from 'next/link';

const MovieContainer = ({ movie }) => {
    if (!movie) return <Loading />;

  return (
    <div className="peliculaDetalles">
      <h2>{movie.original_title}</h2>

   
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