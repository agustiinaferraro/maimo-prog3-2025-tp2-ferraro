'use client'

import { useState, useEffect} from "react";
import Image from "next/image";
import Loading from "./Loading";

const Hero = ({movies}) => {

    const [featuredMovie, setFeaturedMovie] = useState(movies[0]);
    const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`
    
    const handleMovieClick= () => {
      console.log('clickeaste una peli')
    }

    useEffect(() => {
    if (movies && movies.length > 0) {
      setFeaturedMovie(movies[0]);
    }
  }, [movies]);

  if (!featuredMovie) return <Loading />;  // Mostrar loading se cargan los datos
    
    return (

    <section 
    style=
    {{backgroundImage: `url(${IMAGE_BASE}/${featuredMovie.backdrop_path})`,
    }} 
    className={`w-full h-[600px] bg-cover bg-no-repeat bg-center`}>

    <div className="text-white content h-full flex flex-col justify-center items-start px-[50px] bg-black/60">
        <div className="content">
            onClick={handleMovieClick}
            <h2 className="text-5xl"> {featuredMovie.title} </h2>
            <p className="max-w-[500px]"> {featuredMovie.overview} </p>
        </div>
    </div>

    </section>
    
  )
}

export default Hero