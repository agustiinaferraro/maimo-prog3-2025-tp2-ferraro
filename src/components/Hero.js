'use client'

import { useState } from "react";
import Image from "next/image";

const Hero = ({movies}) => {

    const [featuredMovie, setFeaturedMovie] = useState(movies[0]);
    const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`
    return (

    <section 
    style=
    {{backgroundImage: `url(${IMAGE_BASE}/${featuredMovie.backdrop_path})`,
    }} 
    className={`w-full h-[600px] bg-cover bg-no-repeat bg-center`}>
        

    <div className="content h-full flex flex-col justify-center items-start px-[50px] bg-black/60">
        <div className="content">
            <h2 className="text-5xl"> {featuredMovie.title} </h2>
            <p className="max-w-[500px]"> {featuredMovie.overview} </p>
        </div>
        
        <div className="movies">
            {
              movies.map((movie)=>
              (<div key={movie.id}> 
                <h3>{movie.title}</h3>
                  <div>
                    <Image src={`${IMAGE_BASE}/${movie.poster_path}`}
                    width={200}
                    height={100}
                    alt={movie.title}
                    />
                  </div>

              </div>
              ))}
        </div>
    </div>

    </section>
    
  )
}

export default Hero