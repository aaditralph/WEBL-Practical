import React, { useEffect, useState } from 'react';

export default function ItemCard({ item, onSelect }) {
  const [img, setImg] = useState(item.image || '');

  // If the image URL is missing or leads to 404, fetch the item details for the sprite
  useEffect(() => {
    if (img) return;
    if (!item.id) return;
    fetch(`https://pokeapi.co/api/v2/item/${item.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sprites?.default) setImg(data.sprites.default);
      })
      .catch(console.error);
  }, [item.id, img]);

  const handleClick = () => {
    onSelect(item);
  };

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      {img && <img src={img} alt={item.name} loading="lazy" />}
      <h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
    </div>
  );
}
