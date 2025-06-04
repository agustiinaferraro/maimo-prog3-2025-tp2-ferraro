'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading"
import MoviesGrid from "./MoviesGrid"
import Image from 'next/image'

const HomeContainer = () => {
  const [page, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=eb7e3fd7272143562cec959061b5eb32'
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error en la API:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Hubo un error</div>;
  if (!page) return <div>No se encontró la película</div>;

  return (
    <main>
      <section className="hero">
        <Image src="/assets/banner.jpg" alt="banner" width={1550} height={250} />
      </section>

      <div className="HomeContainer">
        <div>
          <h2 className="titulo-peliculas">Las mejores Películas</h2>
        </div>
        <MoviesGrid movies={page.results} />
      </div>
    </main>
  );
};

export default HomeContainer;
