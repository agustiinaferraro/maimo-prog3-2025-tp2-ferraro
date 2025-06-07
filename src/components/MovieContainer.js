import Loading from "./Loading";
import Link from 'next/link';
import Image from "next/image";

const MovieContainer = ({ movie }) => {
  if (!movie) return <Loading />;
  const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`

  return (
    <section style=
    {{backgroundImage: `url(${IMAGE_BASE}/${movie.backdrop_path})`,
    }} 
    className={`w-full bg-cover bg-no-repeat bg-center`}
    >
      <div className=" h-full bg-black/60">
        <div className="w-[80%] max-w-5xl mx-auto ">
          <Link href="/">
            <button className="text-7xl text-white py-6 hover:text-blue-500 active:text-blue-600" >‹</button>
          </Link>
        
          <div className="flex flex-col md:flex-row items-center gap-6 py-6">
              <Image
                className="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                width={300} 
                priority
              />
              <ul className=" text-white py-6 px-6">
                <li className="text-7xl font-bold py-6"> {movie.original_title}</li>
                <li><span className="text-1xl font-bold py-6">Fecha de estreno:</span> {movie.release_date}</li>
                <li><span className="text-1xl font-bold py-6">Idioma original:</span> {movie.original_language}</li>
                <li><span className="text-1xl font-bold py-6">Descripción:</span> {movie.overview}</li>
              </ul>
          </div>
        </div>
      </div>
  </section>
  );
};

export default MovieContainer