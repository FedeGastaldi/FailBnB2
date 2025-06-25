import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setIsMenuOpen(false);
    toast.info("Sesión cerrada correctamente", { autoClose: 2000 });
    navigate("/");
  };

  const handleGoToCrearPropiedad = () => {
    if (usuario) {
      navigate("/crear-propiedad");
    } else {
      navigate("/Login");
      toast.warning("Debes iniciar sesión para crear una propiedad");
    }
  };

  const goToLogin = () => {
    navigate("/Login");
    setIsMenuOpen(false);
  };

  const goToRegister = () => {
    navigate("/Register");
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="flex justify-between items-center bg-verdeFailbnb border-b-2">
        <img
          className="ml-5 w-28 h-28 cursor-pointer"
          src="/logo.png"
          alt="LogoFailBnb"
          onClick={() => navigate("/")}
        />

        <div
          className="flex items-center text-white gap-5 relative mr-5"
          ref={menuRef}
        >
          <h4
            onClick={handleGoToCrearPropiedad}
            className="cursor-pointer border border-gray-300 rounded-full px-4 py-2 hover:bg-white hover:text-black transition"
          >
            {usuario ? "Crear Propiedad" : "Crea tu Anuncio Gratis!"}
          </h4>

          <div className="relative">
            {usuario ? (
              <div
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold cursor-pointer"
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú de usuario"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleMenu();
                  }
                }}
              >
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
            ) : (
              <Bars3Icon
                className="w-10 h-10 text-white cursor-pointer"
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú de opciones"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleMenu();
                  }
                }}
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
                      onClick={() => {
                        navigate("/perfil");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={goToLogin}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={goToRegister}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
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
