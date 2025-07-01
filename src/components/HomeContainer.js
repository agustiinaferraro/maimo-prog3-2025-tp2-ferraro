'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading";
import MoviesGrid from "./MoviesGrid";
import Hero from "./Hero";
import { useAppContext } from "@/app/context/AppContext";

const HomeContainer = () => {
  const [movies, setMovies] = useState([]); // lista original de pelis
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const { searchTerm } = useAppContext();
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const apiKey = 'eb7e3fd7272143562cec959061b5eb32';

        const [resMovies, resPopular, resRated, resUpcoming] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        ]);

        setMovies(resMovies.data.results);
        setPopular(resPopular.data.results);
        setRated(resRated.data.results);
        setUpcoming(resUpcoming.data.results);

        setFilteredMovies(resMovies.data.results);
        setError(false);
      } catch (err) {
        console.error('Error en la API:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  //buscar usando api
  useEffect(() => {
    const apiKey = 'eb7e3fd7272143562cec959061b5eb32';

    if (!searchTerm) {
      //cuando no hay busqueda muestra la lista normal de películas
      setFilteredMovies(movies);
      setError(false);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`
        );
        setFilteredMovies(response.data.results);
        setError(false);
      } catch (err) {
        console.error('Error buscando:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm, movies]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="mx-auto h-screen text-3xl text-white text-center">
        Hubo un error
      </div>
    );
  if (!movies || movies.length === 0)
    return (
      <div className="mx-auto h-screen text-3xl text-white text-center">
        No se encontró la película
      </div>
    );

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
                <p className="text-white text-xl py-4">
                  No se encontraron resultados.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-left text-3xl text-white font-bold py-6">
                Populares
              </h2>
              <MoviesGrid movies={popular} />

              <h2 className="text-left text-3xl text-white font-bold py-6">
                Mejor valoradas
              </h2>
              <MoviesGrid movies={rated} />

              <h2 className="text-left text-3xl text-white font-bold py-6">
                Próximas
              </h2>
              <MoviesGrid movies={upcoming} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;