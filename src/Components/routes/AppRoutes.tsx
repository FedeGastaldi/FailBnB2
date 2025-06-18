import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CardDetail from "../pages/CardDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CrearPropiedad from "../pages/CrearPropiedad";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card/:id" element={<CardDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/crear-propiedad" element={<CrearPropiedad />} />
    </Routes>
  );
}

export default AppRoutes;
