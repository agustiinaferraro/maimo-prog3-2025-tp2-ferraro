import Loading from "./Loading";
import Image from 'next/image';
import Link from 'next/link';

const MoviesGrid = ({ movies }) => {
  return (
    <div className="MoviesGrid">
      <div className="grilla">
        {movies.map((movie) =>   
          <div key={movie.id} className="imgContainer">
            <h2>{movie.title}</h2>
              <Image
                className="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300} 
                priority

              /> {/* imagen de la pelicula */}
                
                <div className="descripcion">
                  <ul>
                    <li>Fecha de estreno: {movie.release_date}</li>
                    <li>Idioma original: {movie.original_language}</li>
                  </ul>
                </div>
            </div>

              )}

          <Link href="/" className="btn-back">
           Volver
          </Link>      
      </div>          
    </div>
  );
};

export default MoviesGrid;