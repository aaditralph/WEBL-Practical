import React, { useEffect, useState } from 'react';

export default function ItemModal({ item, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!item.id) return;
    fetch(`https://pokeapi.co/api/v2/item/${item.id}`)
      .then((res) => res.json())
      .then(setDetails)
      .catch(console.error);
  }, [item.id]);

  if (!details) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          Loading…
        </div>
      </div>
    );
  }

  const { cost, attributes, effect_entries, category, sprites } = details;
  const image = sprites?.default || item.image;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✖</button>
        {image && <img src={image} alt={item.name} className="modal-img" />}
        <h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
        <section>
          <h3>General</h3>
          <ul>
            <li>Cost: {cost}</li>
            <li>Category: {category?.name}</li>
          </ul>
        </section>
        {attributes && attributes.length > 0 && (
          <section>
            <h3>Attributes</h3>
            <ul>
              {attributes.map((a) => (
                <li key={a.name}>{a.name}</li>
              ))}
            </ul>
          </section>
        )}
        {effect_entries && (
          <section>
            <h3>Effects</h3>
            <ul>
              {effect_entries.map((e, idx) => (
                <li key={idx}>{e.effect}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
