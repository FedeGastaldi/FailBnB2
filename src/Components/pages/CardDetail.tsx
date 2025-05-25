function CardDetail() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl pb-3 text-center">
            Departamento en Mar del Plata
          </h1>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Imagen Princiapal */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/edificio.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/entrada.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/oficina.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/comedor.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/banio.jpg"
                  alt="Image"
                  className="w-full h-full object-center"
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/balcon.jpg"
                  alt="Image"
                  className="w-full h-48 object-fill"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/banio2.jpg"
                  alt="Image"
                  className="w-full h-48 object-fill"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/habitacion.jpg"
                  alt="Image"
                  className="w-full h-48 object-fill"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="..//card1/biblioteca.jpg"
                  alt="Image"
                  className="w-full h-48 object-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Descripción */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-2">
          Departamento en Mar del Plata
        </h2>
        <p className="text-gray-600 mb-1">
          2 huéspedes &bull; 3 camas &bull; 1 dormitorio &bull; 2 baños
        </p>
        <p className="text-gray-700 leading-relaxed">
          Este encantador departamento está ubicado a pocas cuadras del mar.
          Cuenta con todas las comodidades necesarias para una estadía
          placentera. Ideal para parejas o familias pequeñas que buscan
          relajarse y disfrutar de la ciudad.
        </p>
      </div>

      {/* Sección anfitrión + reserva */}
      <div className="max-w-4xl mx-auto px-4 pb-8 grid md:grid-cols-3 gap-6 items-start">
        {/* Anfitrión */}
        <div className="col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-24 h-20 rounded-full overflow-hidden bg-gray-300">
              <img
                src="..//card1/opinion2.jpg"
                alt="Imagen del anfitrión"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">
                Anfitrión: Jorge Pereira
              </h4>
              <p className="text-gray-500 text-sm">Miembro desde 2021</p>
            </div>
          </div>
        </div>

        {/* Formulario de reserva */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <p className="text-xl font-semibold mb-2">
            $300{" "}
            <span className="text-sm font-normal text-gray-500">
              por 2 noches
            </span>
          </p>

          <div className="border rounded-lg overflow-hidden mb-4">
            <div className="grid grid-cols-2 divide-x">
              <div className="p-2">
                <p className="text-xs text-gray-500">Check-In</p>
                <p className="text-sm font-medium">12/03/2025</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">Check-Out</p>
                <p className="text-sm font-medium">14/03/2025</p>
              </div>
            </div>
            <div className="border-t p-2">
              <p className="text-xs text-gray-500">Viajeros</p>
              <p className="text-sm font-medium">2</p>
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
