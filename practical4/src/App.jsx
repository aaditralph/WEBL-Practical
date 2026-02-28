import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState([]);

  const [pokemonLevels, setPokemonLevels] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedLevels = localStorage.getItem("pokemonLevels");
    if (savedLevels) {
      setPokemonLevels(JSON.parse(savedLevels));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemonLevels", JSON.stringify(pokemonLevels));
  }, [pokemonLevels]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon list");
        }

        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();

            return {
              name: pokemon.name,
              image: detailData.sprites.front_default,
              url: pokemon.url,
            };
          }),
        );

        setPokemonList(detailedPokemon);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleToggleSelect = (pokemonName, isLevelUp = false) => {
    if (isLevelUp) {
      setPokemonLevels((prev) => ({
        ...prev,
        [pokemonName]: (prev[pokemonName] || 1) + 1,
      }));
    } else {
      if (selectedPokemon.includes(pokemonName)) {
        setSelectedPokemon((prev) => prev.filter((p) => p !== pokemonName));
        setPokemonLevels((prev) => {
          const newLevels = { ...prev };
          delete newLevels[pokemonName];
          return newLevels;
        });
      } else {
        if (selectedPokemon.length < 6) {
          setSelectedPokemon((prev) => [...prev, pokemonName]);
          if (!pokemonLevels[pokemonName]) {
            setPokemonLevels((prev) => ({
              ...prev,
              [pokemonName]: 1,
            }));
          }
        } else {
          alert("Maximum 6 Pokemon can be selected!");
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading Pokemon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Pokemon Selector
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Select up to 6 Pokemon | Click card to see EVs | Level Up to increase
          stats
        </p>

        <div className="text-center mb-6">
          <span className="text-lg font-medium">
            Selected: {selectedPokemon.length}/6
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isSelected={selectedPokemon.includes(pokemon.name)}
              onToggleSelect={handleToggleSelect}
              pokemonLevel={pokemonLevels[pokemon.name] || 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
