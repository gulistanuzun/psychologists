import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Psychologists from "./pages/Psychologists";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
