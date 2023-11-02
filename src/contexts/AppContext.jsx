import { createContext, useState, useContext } from "react";
import bookmarkdata from "../data/bookmark.json";
import { GetAccessToken } from "../api/auth";

const defaultAppContext = {
  bookmarkData: [],
  setBookmarkData: null,
  editBookdark: null,
  setEditBookmark: null,
  setAccessToken: null,
  Auth: null,
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

  const [auth, setAuth] = useState({});

  return (
    <AppContext.Provider
      value={{
        bookmarkData,
        setBookmarkData,
        editBookmark,
        setEditBookmark,
        setAccessToken: async ({ code }) => {
          const data = await GetAccessToken({ code });
          setAuth(data);
        },
        Auth: auth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
