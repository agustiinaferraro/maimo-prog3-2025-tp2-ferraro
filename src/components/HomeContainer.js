'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading"
import MoviesGrid from "./MoviesGrid"
import Hero from "./Hero";
import GenerosContainer from "./GenerosContainer";
import { useAppContext } from "@/app/context/AppContext";


const HomeContainer = () => {
  const [movies, setMovie] = useState(null); //aca se guardan las respuestas de las peliculas
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  

  
  const { searchTerm } = useAppContext();
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const [error, setError] = useState(false); //controla si hubo algun error en la ca;rga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const apiKey = 'eb7e3fd7272143562cec959061b5eb32';
        
        //desestructuración de arrays, saca los valores de un array y los guarda en variables
        const [response, resPopular, resRated, resUpcoming] = await  Promise.all //promise.all agrupa varias promesas al mismo tiempo
        ([ 
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`), //todas las movies
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`),
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`),
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`),
        ]);
        //el.results es porque tengo muchas peticiones
        setMovie(response.data.results); //guarda en data los datos de las peliculas
        setPopular(resPopular.data.results); //populares
        setRated(resRated.data.results); //mejor valoradas
        setUpcoming(resUpcoming.data.results); //proximas

        setFilteredMovies(response.data.results); // inicializa filtradas, es la barra de busqueda de peliisss


        setLoading(false); //se pone en falso, deja de cargar
      } catch (error) {
        console.log('Error en la API:', error);
        setError(true); //si hay un error, devuelve verdadero
        setLoading(false); //deja de cargar
      }
    };

    fetchMovie(); //llama a la funcion cuando se ejecuta el componente 
  }, []); // [] hace que solo se ejecute una vez al inicio


  // filtra las pelis si su nombre incluye es el texto de búsqueda (todo en minusculas)
// setFilteredMovies actualiza la lista filtrada con esos resultados
  useEffect(() => {
    if (movies) {
      const filtered = movies.filter(movie =>
        (movie.title || movie.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);


  if (loading) return <Loading />; //si carga muestra el icono del componente loading
  if (error) return <div className="mx-auto h-screen text-3xl text-white text-center">Hubo un error</div>;
  if (!movies) return <div className="mx-auto h-screen text-3xl text-white text-center">No se encontró la película</div>; 

return (
    <main className="flex flex-col items-center">
      <Hero movies={searchTerm ? filteredMovies : movies} />

      <div className="px-6 py-8 items-center md:w-5/5 overflow-x-hidden">
        <div>
          {searchTerm ? (
            <>
              <h2 className="text-left text-3xl text-white font-bold py-6">
                Resultados para {searchTerm}
              </h2>
              {filteredMovies.length > 0 ? (
                <MoviesGrid movies={filteredMovies} />
              ) : (
                <p className="text-white text-xl py-4">No se encontraron resultados.</p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-left text-3xl text-white font-bold py-6">Populares</h2>
              <MoviesGrid movies={popular} />

              <h2 className="text-left text-3xl text-white font-bold py-6">Mejor valoradas</h2>
              <MoviesGrid movies={rated} />

              <h2 className="text-left text-3xl text-white font-bold py-6">Próximas</h2>
              <MoviesGrid movies={upcoming} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}; // <-- ESTA llave faltaba

export default HomeContainer;
