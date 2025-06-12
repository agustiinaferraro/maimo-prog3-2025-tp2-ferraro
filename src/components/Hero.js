'use client'

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation"; 
import Loading from "./Loading";

const Hero = ({movies}) => {

    const [featuredMovie, setFeaturedMovie] = useState(null);
    const router = useRouter();
    const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`
    
    const handleMovieClick= () => {
      router.push(`/movie/${featuredMovie.id}`); //router es el objeto que maneja la navegacion y push cambia la ruta actual a la que se le pasa
    }

    useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setFeaturedMovie(movies[randomIndex]);
    }

    }, [movies]);

    if (!featuredMovie) return <Loading />;  // Mostrar loading se cargan los datos
    
    return (

    <section 
    style=
    {{backgroundImage: `url(${IMAGE_BASE}${featuredMovie.backdrop_path})`,
    }} 
    className={`w-full h-[600px] bg-cover bg-no-repeat bg-center cursor-pointer`}
    onClick={handleMovieClick}
    >

    <div className="text-white content h-full flex flex-col py-[100px] items-start px-[50px] bg-black/60">
        <div className="content" onClick={handleMovieClick}>
            <h2 className="text-5xl"> {featuredMovie.title} </h2>
            <p className="max-w-[500px]"> {featuredMovie.overview} </p>
        </div>
    </div>

    </section>
    
  )
}

export default Hero