'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading"
import MoviesGrid from "./MoviesGrid"
import Hero from "./Hero";
import Image from 'next/image'

const HomeContainer = () => {
  const [movies, setMovie] = useState(null); //aca se guardan las respuestas de las peliculas
  const [error, setError] = useState(false); //controla si hubo algun error en la carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=eb7e3fd7272143562cec959061b5eb32'
        );
        setMovie(response.data); //guarda en data los datos de las peliculas
        setLoading(false); //se pone en falso, deja de cargar
      } catch (error) {
        console.log('Error en la API:', error);
        setError(true); //si hay un error, devuelve verdadero
        setLoading(false); //deja de cargar
      }
    };

    fetchMovie(); //llama a la funcion cuando se ejecuta el componente 
  }, []); // [] hace que solo se ejecute una vez al inicio

  if (loading) return <Loading />; //si carga muestra el icono del componente loading
  if (error) return <div className="mx-auto h-screen text-3xl text-white text-center">Hubo un error</div>;
  if (!movies) return <div className="mx-auto h-screen text-3xl text-white text-center">No se encontró la película</div>; 

  return (
    <main className="flex flex-col items-center"> {/*
    flex flex-col: organiza los hijos en columna
    items-center: centra horizontalmente*/}
     
    {!loading && <Hero movies={movies.results} />} 
    {loading && <Loading />}

      <div className="px-6 py-8 items-center md:w-2/5">
        <div>
          <h2 className="text-left text-3xl text-white font-bold  py-6">Principales</h2>
        </div>
        <MoviesGrid movies={movies.results} />
      </div>
    </main>
  );
};

export default HomeContainer;
