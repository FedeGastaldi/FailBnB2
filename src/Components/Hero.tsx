import type { HeroProps } from "../types";

function Hero({ imgSrc = "mardel.jpg" }: HeroProps) {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold text-pink-700">
              FailBnB<span className="text-pink-600">.</span>
            </div>
            <div>
              <img className="w-8" />
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Encuentra Tu <span className="text-pink-700">Espacio</span> a
                Medida
              </h1>
              <div className="w-20 h-2 bg-pink-700 my-4"></div>
              <p className="text-xl mb-10">
                Descubrí alojamientos únicos y acogedores rodeados de
                naturaleza. Explorá, reservá y viví una experiencia diferente en
                cada rincón.
              </p>
              <button
                onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
                className="bg-pink-700 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Resrva Ahora!
              </button>
            </div>
          </header>
        </div>
      </div>
      <img
        src={imgSrc}
        alt="hero-img"
        className="w-full h-24 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
}

export default Hero;
