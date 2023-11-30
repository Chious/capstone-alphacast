import { createContext, useState, useContext } from "react";

const defaultBookmarkContext = {
  pickedCard: null,
  setPickedCard: () => {},
};

const BookmarkContext = createContext(defaultBookmarkContext);

export const useBookmark = () => useContext(BookmarkContext);
export const BookmarkProvider = ({ children }) => {
  const [pickedCard, setPickedCard] = useState(null);

  return (
    <BookmarkContext.Provider value={{ pickedCard, setPickedCard }}>
      {children}
    </BookmarkContext.Provider>
  );
};
