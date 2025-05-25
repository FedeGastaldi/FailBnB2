import Card from "../../Components/Card";
// import Carruse from "./Components/Carruse";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
function App() {
  return (
    <>
      <Header />

      <div className=" mt-3 mx-auto max-w-3xl px-4 ">
        <h2 className="cursor-pointer text-2xl font-bold">
          Nuestros Destinos Más Populares <span>&gt;</span>
        </h2>
        <div className="flex flex-row mt-2 gap-2">
          {/* Maximo 3 cards por seccion */}
          <Card
            popular={true}
            titulo="Departamento en Mar del Plata"
            banios={1}
            camas={2}
            calificacion={4.5}
            imagen="/card1/edificio.jpg"
            precio={33}
          />
        </div>
      </div>

      {/* <Carruse /> */}
      {/* seccion Hero */}
      <div className="mt-3 mx-auto max-w-7xl ">
        <Hero />
      </div>
    </>
  );
}

export default App;
