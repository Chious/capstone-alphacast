import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import Podcast from "./pages/Podcast";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="pending" element={<Pending />} />
            <Route path="login" element={<Login />} />
            <Route path="podcast" element={<Podcast />} />
            <Route path="favorite" element={<Favorite />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
