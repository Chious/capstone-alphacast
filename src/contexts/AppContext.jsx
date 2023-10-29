import { createContext, useState, useContext } from "react";
import bookmarkdata from "../data/bookmark.json";

const defaultAppContext = {
  bookmarkData: [],
  setBookmarkData: null,
  editBookdark: null,
  setEditBookmark: null,
};

const AppContext = createContext(defaultAppContext);

export const useApp = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [bookmarkData, setBookmarkData] = useState(bookmarkdata);
  const [editBookmark, setEditBookmark] = useState({
    target: null,
    edit: null,
    doublecheck: null,
    count: 1000000,
  });

  return (
    <AppContext.Provider
      value={{
        bookmarkData,
        setBookmarkData,
        editBookmark,
        setEditBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
