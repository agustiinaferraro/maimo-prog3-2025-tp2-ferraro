'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Loading from "./Loading";
import { useAppContext } from "@/app/context/AppContext";

const Hero = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const IMAGE_BASE = `https://image.tmdb.org/t/p/original/`;
  const { favorites } = useAppContext();

  const handleMovieClick = () => {
    if (movies && movies.length > 0) {
      router.push(`/movie/${movies[currentIndex].id}`);
    }
  };

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return <Loading />;

  const featuredMovie = movies[currentIndex];

  // Si no existe backdrop_path mostramos Loading para evitar error
  if (!featuredMovie?.backdrop_path) return <Loading />;

  return (
    <section
      style={{
        backgroundImage: `url(${IMAGE_BASE}${featuredMovie.backdrop_path})`,
      }}
      className="w-full h-[600px] bg-cover bg-no-repeat bg-center cursor-pointer"
      onClick={handleMovieClick}
    >
      <div className="text-white content h-full flex flex-col py-[280px] items-start px-[50px] bg-black/60 justify-center">
        <div className="content" onClick={handleMovieClick}>
          <h2 className="text-5xl font-bold">{featuredMovie.title}</h2>
          <p className="max-w-[500px]">{featuredMovie.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;