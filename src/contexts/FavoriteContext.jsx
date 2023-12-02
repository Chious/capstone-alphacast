import { createContext, useState, useContext } from "react";

const defaultFavoriteContext = {
  pickedCard: null,
  setPickedCard: () => {},
  savedShows: null,
  setSavedShows: () => {},
};

const FavoriteContext = createContext(defaultFavoriteContext);

export const useFavorite = () => useContext(FavoriteContext);
export const FavoriteProvider = ({ children }) => {
  const [pickedCard, setPickedCard] = useState(null);
  const [savedShows, setSavedShows] = useState([]);

  return (
    <FavoriteContext.Provider
      value={{ pickedCard, setPickedCard, savedShows, setSavedShows }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
