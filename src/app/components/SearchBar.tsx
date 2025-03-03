"use client";
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";

interface Pokemon {
    name: string;
    sprite: string;
}

export function SearchBar() {
    const [input, setInput] = useState<string>("");
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const url = input ? `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}` : "";
    const { data, loading, error } = useFetchData<{ name: string; sprites: { front_default: string } }>(url);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {

            if (data)
            {
                addPokemonToGrid();
            }
           
            else if (error){
                setShowModal(true);
            }
        }
    };

    const addPokemonToGrid = () => {
        if (data && !pokemons.some((p) => p.name === data.name)) {
            setPokemons([...pokemons, { name: data.name, sprite: data.sprites.front_default }]);
        }
        setInput(""); 
    };

    return (
        <div className="flex flex-col items-center  text-white p-6">
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search a Pokémon..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress} 
                className="w-150 h-12 px-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Mensajes de loading y error */}
            <div className="h-6 flex items-center mt-4">
                {loading && <div className="text-gray-400">Loading...</div>}
                {!loading && error && !data && <div className="text-red-500 ml-4">Error: {error}</div>}
            </div>

             {/* Modal en caso de que no funciona  */}

            {showModal && <ErrorModal onClose={() => setShowModal(false)} />}

            {/* Grid de pokemon encontrados */}
            <PokemonGrid pokemons={pokemons} />
        </div>
    );
}

function PokemonGrid({ pokemons }: { pokemons: Pokemon[] }) {
    return (
        <div className="mt-6 grid grid-cols-3 gap-10">
            {pokemons.map((pokemon) => (
                <div key={pokemon.name} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
                    <img src={pokemon.sprite} alt={pokemon.name} className="w-20 h-20 mt-2" />
                </div>
            ))}
        </div>
    );
}

function ErrorModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-red-600">Error</h2>
                <p className="text-gray-700 mt-2">El Pokémon no existe. Intenta con otro.</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}