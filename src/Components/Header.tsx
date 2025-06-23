import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  //ir a crear propiedad
  const handleGoToCrearPropiedad = () => {
    if (usuario) {
      navigate("/crear-propiedad");
    } else {
      navigate("/Login");
      toast.warning("Debes iniciar sesión para crear una propiedad");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  //Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
    setIsMenuOpen(false);
  };
  //ir a login
  const goToLogin = () => {
    navigate("/Login");
    setIsMenuOpen(false);
  };
  //ir a register
  const goToRegister = () => {
    navigate("/Register");
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="flex justify-between items-center bg-verdeFailbnb border-b-2">
        <img
          onClick={() => navigate("/")}
          className="ml-5 w-28 h-28 cursor-pointer"
          src="/logo.png"
          alt="LogoFailBnb"
        />

        <div className="flex items-center text-white gap-5 relative mr-5">
          <h4
            onClick={handleGoToCrearPropiedad}
            className="cursor-pointer border border-gray-300 rounded-full px-4 py-2"
          >
            {usuario ? "Crear Propiedad" : "Crea tu Anuncio Gratis!"}
          </h4>

          <div className="relative">
            {usuario ? (
              // Avatar de usuario
              <div
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold cursor-pointer"
                onClick={toggleMenu}
              >
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
            ) : (
              // Icono Bars3 si no está logueado
              <Bars3Icon
                className="w-10 h-10 text-white cursor-pointer"
                onClick={toggleMenu}
              />
            )}

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg text-black z-50">
                {usuario ? (
                  <>
                    <div className="px-4 py-2 border-b text-sm text-gray-700">
                      Hola, <strong>{usuario.nombre}</strong>
                    </div>
                    <button
                      onClick={() => navigate("/perfil")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={goToLogin}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={goToRegister}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
