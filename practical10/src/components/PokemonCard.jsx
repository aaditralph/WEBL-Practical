import React from 'react';

export default function PokemonCard({ pokemon, onSelect }) {
  const handleClick = () => {
    onSelect(pokemon);
  };
  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
  );
}
