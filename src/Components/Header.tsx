import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center bg-verdeFailbnb border-b-2">
        <img className="ml-5 w-28 h-28" src="logo.png" alt="LogoFailBnb" />
        <div className="flex items-center text-white gap-5">
          <h4 className="cursor-pointer border border-gray-300 rounded-full px-4 py-2">
            Conviertete en Anfitrión
          </h4>
          <Bars3Icon className="w-10 h-10 text-white mr-5 cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 border-2 p-6 border-gray-200 rounded-full mt-3 w-fit mx-auto font-bold">
        {/* CheckIn */}
        <div>
          <button className="cursor-pointer border border-gray-300 rounded-xl px-4 py-2">
            CheckIn: <span className="font-extralight">¿Cuando?</span>
          </button>
        </div>

        {/* CheckOut */}
        <div>
          <button className="cursor-pointer border border-gray-300 rounded-xl px-4 py-2">
            CheckOut: <span className="font-extralight">¿Cuando?</span>
          </button>
        </div>

        {/* Viajeros */}
        <div>
          <label>Viajeros:</label>
          <select className="cursor-pointer border border-gray-300 rounded-xl px-4 py-2">
            <option>¿Cuantos?</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        {/* Lupa */}
        <div>
          <MagnifyingGlassIcon className="w-10 h-10 cursor-pointer border border-gray-300 rounded-xl p-2" />
        </div>
      </div>
    </header>
  );
}

export default Header;
