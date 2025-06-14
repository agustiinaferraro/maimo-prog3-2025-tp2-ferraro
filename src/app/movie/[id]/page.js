import MovieContainer from "@/components/MovieContainer";

//se ejecuta cuando se carga la pag de una pelicula
export default async function MoviePage({ params }) {
  const apiKey = "eb7e3fd7272143562cec959061b5eb32";

  const id = params.id;   //extrae el id de la URL

  //solicitud a la api para obtener los detalles de la pelicula
  const movieData = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`);

  const movie = await movieData.json(); //convierte la respuesta en un objeto javascript (JSON)

  return ( // devuelve eel componente con los datos de la peli
    <div className="col-span-4 w-full bg-black bg-opacity-70 flex justify-center items-center">
      {/* Le pasa el objeto de la peli al componente moviecontainer */}
      <MovieContainer movie={movie} />
    </div>
  );
}


