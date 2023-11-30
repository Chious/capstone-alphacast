import { createContext, useState, useContext } from "react";
import bookmarkdata from "../data/bookmark.json";
import { GetAccessToken } from "../api/auth";
import { GetUser } from "../api/spotifyAPI";
import { CreateAccount } from "../api/acAPI";

const defaultAppContext = {
  bookmarkData: [],
  setBookmarkData: null,
  editBookdark: null,
  setEditBookmark: null,
  setAccessToken: null,
  GetUser: null,
  user: null,
  CreateAccount: null,
  bookmark: null,
  setBookmark: null,
};

const AppContext = createContext(defaultAppContext);

export const useApp = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [bookmark, setBookmark] = useState([]);
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
        setAccessToken: async ({ code }) => {
          await GetAccessToken({ code });
        },
        GetUser: async () => {
          const response = await GetUser();
          if (response !== undefined) {
            setUser(response);
          }
        },
        user,
        CreateAccount: async () => {
          await CreateAccount();
        },
        bookmark,
        setBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
