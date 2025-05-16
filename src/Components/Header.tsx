import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Bars3Icon } from "@heroicons/react/16/solid";
function Header() {
  return (
    <header>
      <div className="flex justify-between items-center verdeFailbnb border-b-2">
        <img className=" ml-5 size-30" src="logo.png" alt="LogoFailBnb" />
        <div className="flex items-center text-white gap-5">
          <h4 className="cursor-pointer border border-gray-300 rounded-4xl p-1">
            Conviertete en Anfitrión
          </h4>
          <Bars3Icon className="size-12 text-white mr-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 border-2 p-6 border-gray-200 rounded-4xl mt-3 w-fit mx-auto font-bold ">
        {/*Buscador  */}
        <div>
          <button className="cursor-pointer border border-gray-300 rounded-4xl  p-1">
            CheckIn: <span className="font-extralight ">¿Cuando?</span>
          </button>
        </div>
        <div>
          <button className="cursor-pointer border border-gray-300 rounded-4xl  p-1">
            CheckOut: <span className="font-extralight ">¿Cuando?</span>
          </button>
        </div>
        <div>
          <label className="">Viajeros:</label>
          <select className="cursor-pointer border border-gray-300 rounded-4xl p-1">
            <option>¿Cuantos?</option>
            <option value="">1</option>
            <option value="">2</option>
          </select>
        </div>
        <div>
          <MagnifyingGlassIcon className="size-12 cursor-pointer border border-gray-300 rounded-4xl p-1 " />
        </div>
      </div>
    </header>
  );
}

export default Header;
