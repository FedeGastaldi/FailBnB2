import { useNavigate, useSearchParams } from "react-router-dom";
import type { CardProps } from "../types";

const Card = ({
  id,
  popular,
  titulo,
  calificacion,
  imagen,
  precio,
  camas,
  banios,
}: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // <-- esto es clave

  const handleClick = () => {
    // Reconstituimos los params actuales
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const viajeros = searchParams.get("viajeros") || "";

    navigate(
      `/card/${id}?checkin=${encodeURIComponent(
        checkin
      )}&checkout=${encodeURIComponent(checkout)}&viajeros=${encodeURIComponent(
        viajeros
      )}`
    );
  };

  const getImagenSrc = (portada: string) => {
    if (!portada) return "/img/default.jpg";
    return portada;
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-2xl w-72 cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="h-56 w-full object-cover object-center"
        src={getImagenSrc(imagen)}
        alt="Imagen de la propiedad"
      />
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          {popular && (
            <span className="inline-block bg-olivaOscuro text-white py-2 px-4 text-xs rounded-full uppercase font-bold tracking-wide">
              popular
            </span>
          )}
          <div className="text-gray-600 text-xs uppercase font-semibold pl-2 tracking-wide">
            <p>
              {camas} camas &bull; {banios} baños
            </p>
          </div>
        </div>
        <h4 className="mt-2 font-semibold text-xl leading-tight truncate">
          {titulo}
        </h4>
        <div className="mt-1 text-gray-600 text-sm font-semibold">
          ${precio} por noche
        </div>
        <div className="mt-2 text-teal-600 font-semibold">{calificacion}★</div>
      </div>
    </div>
  );
};

export default Card;
