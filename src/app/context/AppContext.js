'use client'

import { useState, useEffect, useContext, createContext } from 'react';
const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  //aca va mi logica y funciones custom

  useEffect(() => {
    console.log(favorites) //el console.log es asincronico. si quiero ver algun valor tengo que ponerlo en el useefecr y ponerlo en el array
  }, [favorites]) //este es el array

  //aca ver si es titile u origin title algo asi
  const handleAddToFavorites = (title, image, id) => {
    setFavorites([...favorites, { title, image, id }])
  };

  const deleteToFavorites = (borrar) => {
    const newFavorites = favorites.filter(movie => movie.id !== borrar);  //el filter crea un nuevo array solo con las peliculas que cumplan con la condicion (todas las peliculas cuyo id sean distintos a "borrar")
    setFavorites(newFavorites) //actualizo setfavorites
  };

  const favoritesQty = () => favorites.length //ver cuantos favoritos hay

  return (
    <AppContext.Provider
      value={{
        favorites,
        handleAddToFavorites,
        deleteToFavorites, 
        favoritesQty
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('error')
  }
  return context;
}

export default AppContext
