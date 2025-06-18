import Card from "../../Components/Card";
// import Carruse from "./Components/Carruse";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import type { PropiedadFromDB } from "../../types";
function App() {
  const [propiedades, setPropiedades] = useState<PropiedadFromDB[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/propiedades")
      .then((response) => {
        setPropiedades(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar propiedades:", error);
      });
  }, []);
  const propiedadesPorUbicacion: Record<string, PropiedadFromDB[]> = {};
  propiedades.forEach((p) => {
    if (!propiedadesPorUbicacion[p.ubicacion]) {
      propiedadesPorUbicacion[p.ubicacion] = [];
    }
    propiedadesPorUbicacion[p.ubicacion].push(p);
  });
  const ubicacionesUnicas = Object.entries(propiedadesPorUbicacion);
  return (
    <>
      <Header />

      {ubicacionesUnicas.map(([ubicacion, props], index) => (
        <div key={ubicacion} className="mt-3 mx-auto max-w-3xl px-4">
          <h2 className="cursor-pointer text-2xl font-bold mb-2">
            Destinos Populares para {ubicacion} <span>&gt;</span>
          </h2>
          <div className="flex flex-row mt-2 gap-2 flex-wrap">
            {props.slice(0, 3).map((propiedad) => (
              <Card
                key={propiedad.id}
                popular={true}
                titulo={propiedad.titulo}
                precio={propiedad.precio_noche}
                camas={propiedad.cant_habitaciones}
                banios={propiedad.cant_banios}
                imagen={"/depa2.jpg"} // Esto luego debería venir de propiedad
                ubicacion={propiedad.ubicacion}
                calificacion={4.5}
              />
            ))}
          </div>

          {/* Mostrar el Hero cada 4 secciones */}
          {(index + 1) % 4 === 0 && (
            <div className="mt-6 mx-auto max-w-7xl">
              <Hero />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default App;
