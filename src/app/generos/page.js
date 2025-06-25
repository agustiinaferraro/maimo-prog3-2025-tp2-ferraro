'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import GenerosContainer from "@/components/GenerosContainer";

const PageGeneros = () => {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      setLoading(true);
      try {
        const apiKey = 'eb7e3fd7272143562cec959061b5eb32';
        const [moviesRes, genresRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`),
        ]);

        const allMovies = moviesRes.data.results;
        const genresList = genresRes.data.genres;

        const grouped = {};
        genresList.forEach((genre) => {
          grouped[genre.name] = allMovies.filter(movie =>
            movie.genre_ids.includes(genre.id)
          );
        });

        setGenres(genresList);
        setMoviesByGenre(grouped);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  if (loading) return <div className="text-white text-2xl text-center py-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-2xl text-center py-10">Error al cargar datos</div>;

  return (
    <main className="px-6 py-8">
      <h1 className="text-white text-4xl font-bold pb-6">Películas por género</h1>
        {genres.map((genre) => {
          const movies = moviesByGenre[genre.name];
          if (!movies || movies.length === 0) return null;

          return (
            <div key={genre.id}>
              <h2 className="text-left text-3xl text-white font-bold py-6">{genre.name}</h2>
              <GenerosContainer movies={movies} />
            </div>
          );
        })}
    </main>
  );
};

export default PageGeneros;