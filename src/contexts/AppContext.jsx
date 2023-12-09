import { createContext, useState, useContext } from "react";
import bookmarkdata from "../data/bookmark.json";
import { GetAccessToken } from "../api/auth";
import { GetUser } from "../api/spotifyAPI";
import { CreateAccount } from "../api/acAPI";

const defaultAppContext = {
  setAccessToken: null,
  GetUser: null,
  user: null,
  CreateAccount: null,
  bookmark: null,
  setBookmark: null,
  nowPlayInfo: null,
  setNowPlayInfo: () => {},
  savedFavorite: [],
  setSavedFavorite: () => {},
};

const AppContext = createContext(defaultAppContext);

export const useApp = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [bookmark, setBookmark] = useState([]);
  const [bookmarkData, setBookmarkData] = useState(bookmarkdata);
  const [nowPlayInfo, setNowPlayInfo] = useState({
    id: null,
    title: null,
    description: null,
  });
  const [savedFavorite, setSavedFavorite] = useState([]);

  return (
    <AppContext.Provider
      value={{
        bookmarkData,
        setBookmarkData,
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
        nowPlayInfo,
        setNowPlayInfo,
        savedFavorite,
        setSavedFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
