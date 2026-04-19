import React, { useEffect, useState } from 'react';

export default function PokemonModal({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((res) => res.json())
      .then(setDetails)
      .catch(console.error);
  }, [pokemon.id]);

  if (!details) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          Loading…
        </div>
      </div>
    );
  }

  const { stats, sprites, types, abilities } = details;
  const image = sprites.other?.['official-artwork']?.front_default || pokemon.image;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✖</button>
        <img src={image} alt={pokemon.name} className="modal-img" />
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <section>
          <h3>Types</h3>
          <ul>
            {types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Abilities</h3>
          <ul>
            {abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Stats</h3>
          <ul>
            {stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
