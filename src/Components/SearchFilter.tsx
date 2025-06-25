// components/SearchFilter.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchFilter() {
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [viajeros, setViajeros] = useState("1");

  const handleSearch = () => {
    if (!ubicacion || !checkin || !checkout || !viajeros) return;

    const query = new URLSearchParams({
      ubicacion,
      checkin,
      checkout,
      viajeros,
    }).toString();

    navigate(`/filter-response?${query}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5 border-2 p-6 md:p-8 border-gray-200 rounded-3xl mt-3 w-full max-w-5xl mx-auto font-bold bg-white shadow-sm">
      <input
        type="text"
        placeholder="¿Dónde?"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        className="w-full md:w-auto flex-1 border border-gray-300 rounded-xl px-4 py-2"
      />
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
        <label htmlFor="checkin">IN</label>
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded-xl px-4 py-2"
        />
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
        <label htmlFor="checkout">OUT</label>
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded-xl px-4 py-2"
        />
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
        <label htmlFor="viajeros">Viajeros</label>
        <select
          value={viajeros}
          onChange={(e) => setViajeros(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded-xl px-4 py-2"
        >
          <option value="">¿Cuántos?</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">Más de 5</option>
        </select>
      </div>
      <div className="w-full md:w-auto flex justify-center md:justify-start">
        <MagnifyingGlassIcon
          onClick={handleSearch}
          className="w-10 h-10 cursor-pointer border border-gray-300 rounded-xl p-2 hover:text-white hover:bg-pink-500"
        />
      </div>
    </div>
  );
}

export default SearchFilter;
