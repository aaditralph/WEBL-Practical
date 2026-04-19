import React, { useEffect, useState } from 'react';

export default function BerryModal({ berry, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!berry.id) return;
    fetch(`https://pokeapi.co/api/v2/berry/${berry.id}`)
      .then((res) => res.json())
      .then(setDetails)
      .catch(console.error);
  }, [berry.id]);

  if (!details) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          Loading…
        </div>
      </div>
    );
  }

  const { growth_time, size, firmness, flavors } = details;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✖</button>
        <h2>{berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}</h2>
        <section>
          <h3>General</h3>
          <ul>
            <li>Growth time: {growth_time} hrs</li>
            <li>Size: {size}</li>
            <li>Firmness: {firmness.name}</li>
          </ul>
        </section>
        <section>
          <h3>Flavors</h3>
          <ul>
            {flavors.map((f) => (
              <li key={f.flavor.name}>
                {f.flavor.name}: {f.potency}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
