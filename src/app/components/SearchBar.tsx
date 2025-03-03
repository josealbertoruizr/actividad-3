"use client";
import { useState, useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { WeatherData } from "../types/weather";
import { WeatherGrid } from "./WeatherGrid";
import { ErrorModal } from "./ErrorModal";


const API_KEY = "af80e2d077144f28917174158250303";
const BASE_URL = "https://api.weatherapi.com/v1";

export function SearchBar() {
  const [input, setInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<WeatherData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);


  const url = searchTerm ? `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}` : "";
  const { data, loading, error } = useFetchData<WeatherData>(url);


  useEffect(() => {
    // Solo buscar si el input tiene al menos 3 caracteres
    if (input.length >= 3) {
      const timeoutId = setTimeout(() => {
        setSearchTerm(input);
      }, 500); // Esperar 500ms después de que el usuario deje de escribir

      return () => clearTimeout(timeoutId);
    }
  }, [input]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.length > 0) {
      setSearchTerm(input); // Forzar búsqueda inmediata al presionar Enter
    }
  };

  const addLocationToGrid = () => {
    if (data && !locations.some((loc) => loc.location.name === data.location.name)) {
      setLocations([...locations, data]);
      setInput("");
      setSearchTerm("");
    }
  };

  // añadir la ubicación cuando los datos se cargan con éxito
  useEffect(() => {
    if (data && !loading && !error) {
      addLocationToGrid();
    } else if (!loading && error) {
      setShowModal(true);
    }
  }, [data, loading, error]);

  return (
    <div className="flex flex-col items-center text-white p-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar una ciudad o lugar..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full h-12 px-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {input.length > 0 && input.length < 3 && (
          <p className="text-xs text-gray-400 mt-1">Ingresa al menos 3 caracteres para buscar</p>
        )}
      </div>

      {/* Mensajes de loading y error */}
      <div className="h-6 flex items-center mt-4">
        {loading && <div className="text-gray-400">Cargando...</div>}
        {!loading && error && searchTerm && (
          <div className="text-red-500 ml-4">Error: No se pudo conectar a la API</div>
        )}
      </div>

      {/* Modal en caso de que no funciona */}
      {showModal && <ErrorModal onClose={() => setShowModal(false)} />}

      {/* Grid de ubicaciones encontradas */}
      <WeatherGrid locations={locations} />
    </div>
  );
}