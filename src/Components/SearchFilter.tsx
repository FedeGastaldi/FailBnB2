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
    <div className="flex items-center justify-center gap-5 border-2 p-8 border-gray-200 rounded-full mt-3 w-fit mx-auto font-bold">
      <input
        type="text"
        placeholder="¿Dónde?"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      />
      <label htmlFor="checkin">Check-in</label>
      <input
        type="date"
        value={checkin}
        onChange={(e) => setCheckin(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      />
      <label htmlFor="checkout">Check-out</label>
      <input
        type="date"
        value={checkout}
        onChange={(e) => setCheckout(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      />
      <label htmlFor="checkin">viajeros</label>

      <select
        value={viajeros}
        onChange={(e) => setViajeros(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      >
        <option value="">¿Cuántos?</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">Más de 5</option>
      </select>

      <MagnifyingGlassIcon
        onClick={handleSearch}
        className="w-10 h-10 cursor-pointer border border-gray-300 rounded-xl p-2 hover:bg-gray-100"
      />
    </div>
  );
}

export default SearchFilter;
