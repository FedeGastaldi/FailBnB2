import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CardDetail from "../pages/CardDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CrearPropiedad from "../pages/CrearPropiedad";
import FilterResponse from "../pages/FilterResponse";
import Profile from "../pages/Profile";
import Recuperar from "../pages/Recuperar";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card/:id" element={<CardDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/crear-propiedad" element={<CrearPropiedad />} />
      <Route path="/filter-response" element={<FilterResponse />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/recuperar" element={<Recuperar />} />
    </Routes>
  );
}

export default AppRoutes;
