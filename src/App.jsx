import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import Podcast from "./pages/Podcast";
import Favorite from "./pages/Favorite";
import BookmarkPage from "./pages/BookmarkPage";
import MUIthemeProvider from "./styles/themeProvider";
import { AppProvider } from "./contexts/AppContext";
import bookmarkData from "./data/bookmark.json";

function App() {
  const routes = bookmarkData.map((bookmark) => {
    return (
      <Route
        path={`me/${bookmark.id}`}
        element={<BookmarkPage />}
        key={bookmark.id}
      />
    );
  });

  return (
    <>
      <div className="app">
        <AppProvider>
          <MUIthemeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="pending" element={<Pending />} />
                <Route path="login" element={<Login />} />
                <Route path="podcast" element={<Podcast />} />
                <Route path="favorite" element={<Favorite />} />
                {routes}
              </Routes>
            </BrowserRouter>
          </MUIthemeProvider>
        </AppProvider>
      </div>
    </>
  );
}

export default App;
