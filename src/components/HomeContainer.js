'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading"
import MoviesGrid from "./MoviesGrid"
import Image from 'next/image'

const HomeContainer = () => {
  const [page, setMovie] = useState(null); //aca se guardan las respuestas de las peliculas
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
  if (!page) return <div className="mx-auto h-screen text-3xl text-white text-center">No se encontró la película</div>; 

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"> {/*
    flex flex-col: organiza los hijos en columna
    items-center: centra horizontalmente*/}
      <section>
        <Image src="/assets/banner.jpg" alt="banner" width={1550} height={250} className="h-[250px] object-cover rounded-none"/>
      </section>

      <div className="px-4 py-8 items-center">
        <div>
          <h2 className="text-center text-3xl text-white font-bold">Las mejores Películas</h2>
        </div>
        <MoviesGrid movies={page.results} />
      </div>
    </main>
  );
};

export default HomeContainer;
