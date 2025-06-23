import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const [propiedad, setPropiedad] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/api/propiedades/${id}`)
      .then((res) => setPropiedad(res.data))
      .catch((err) => console.error("Error al obtener propiedad:", err));
  }, [id]);

  if (!propiedad) {
    return <div className="text-center mt-10 text-gray-500">Cargando...</div>;
  }

  const {
    titulo,
    descripcion,
    cant_habitaciones,
    cant_baños,
    capacidad_max,
    precio_noche,
    imagenes = [],
  } = propiedad;

  const portada = imagenes[0] || "/img/default.jpg";
  // const secundarias = imagenes.slice(1); // puede ser array vacío
  // console.log(portada, typeof portada);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl pb-3 text-center">{titulo}</h1>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Imagen principal */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={portada}
                  alt="Portada"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Imágenes secundarias */}
              {/* {secundarias.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-2">{titulo}</h2>
        <p className="text-gray-600 mb-1">
          {capacidad_max} huéspedes &bull; {cant_habitaciones} habitaciones
          &bull; {cant_baños} baños
        </p>
        <p className="text-gray-700 leading-relaxed">{descripcion}</p>
      </div>

      {/* Sección anfitrión + reserva */}
      <div className="max-w-4xl mx-auto px-4 pb-8 grid md:grid-cols-3 gap-6 items-start">
        {/* Anfitrión */}
        <div className="col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-24 h-20 rounded-full overflow-hidden bg-gray-300">
              <img
                src="/img/default-user.jpg"
                alt="Imagen del anfitrión"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Anfitrión</h4>
              <p className="text-gray-500 text-sm">Usuario registrado</p>
            </div>
          </div>
        </div>

        {/* Formulario reserva (placeholder) */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <p className="text-xl font-semibold mb-2">
            ${precio_noche}{" "}
            <span className="text-sm font-normal text-gray-500">por noche</span>
          </p>
          <div className="border rounded-lg overflow-hidden mb-4">
            <div className="grid grid-cols-2 divide-x">
              <div className="p-2">
                <p className="text-xs text-gray-500">Check-In</p>
                <p className="text-sm font-medium">--/--/----</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">Check-Out</p>
                <p className="text-sm font-medium">--/--/----</p>
              </div>
            </div>
            <div className="border-t p-2">
              <p className="text-xs text-gray-500">Viajeros</p>
              <p className="text-sm font-medium">--</p>
            </div>
          </div>

          <button className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-oliva text-sm transition duration-300">
            Reservar
          </button>
        </div>
      </div>
    </>
  );
}

export default CardDetail;
