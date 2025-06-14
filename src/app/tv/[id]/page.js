import MovieContainer from "@/components/MovieContainer";

//se ejecuta cuando se carga la pag de una pelicula
export default async function TvPage({ params }) {
  const apiKey = "eb7e3fd7272143562cec959061b5eb32";

  const id = params.id;

  const tvData = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es-ES`);
  const tvShow = await tvData.json();

  return (
    <div className="col-span-4 w-full bg-black bg-opacity-70 flex justify-center items-center">
      <MovieContainer movie={tvShow} />
    </div>
  );
}