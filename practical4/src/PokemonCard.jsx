import { useState } from "react";

function PokemonCard({ pokemon, isSelected, onToggleSelect, pokemonLevel }) {
  const [showEVs, setShowEVs] = useState(false);
  const [evs, setEvs] = useState(null);

  const handleCardClick = () => {
    if (!isSelected) {
      onToggleSelect(pokemon.name);
      return;
    }

    const newEvs = {
      hp: Math.floor(Math.random() * 100),
      attack: Math.floor(Math.random() * 100),
      defense: Math.floor(Math.random() * 100),
      speed: Math.floor(Math.random() * 100),
    };
    setEvs(newEvs);
    setShowEVs(!showEVs);
  };

  const handleLevelUp = (e) => {
    e.stopPropagation();
    if (isSelected) {
      onToggleSelect(pokemon.name, true);
    }
  };

  return (
    <div
      className={`
        border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-green-500 bg-green-50 hover:border-green-600"
            : "border-gray-300 bg-white hover:border-gray-400"
        }
      `}
      onClick={handleCardClick}
    >
      <div className="flex justify-center mb-3">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
      </div>

      <h3 className="text-lg font-semibold text-center capitalize mb-2">
        {pokemon.name}
      </h3>

      <p className="text-sm text-center text-gray-600 mb-2">
        {isSelected ? "✅ Selected" : "Click to select"}
      </p>

      {isSelected && (
        <div className="text-center mb-3">
          <span className="text-sm text-gray-600">Level: </span>
          <span className="font-bold text-green-600">{pokemonLevel}</span>
        </div>
      )}

      {isSelected && (
        <button
          onClick={handleLevelUp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Level Up
        </button>
      )}

      {isSelected && showEVs && evs && (
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <p className="text-sm font-semibold text-center mb-2">EV Values</p>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <p>HP: {evs.hp}</p>
            <p>Attack: {evs.attack}</p>
            <p>Defense: {evs.defense}</p>
            <p>Speed: {evs.speed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
