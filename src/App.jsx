import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Psychologists from "./pages/Psychologists";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/psychologists" element={<Psychologists />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
