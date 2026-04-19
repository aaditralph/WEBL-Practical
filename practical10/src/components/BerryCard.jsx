import React from 'react';

export default function BerryCard({ berry, onSelect }) {
  const handleClick = () => {
    onSelect(berry);
  };
  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <h3>{berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}</h3>
    </div>
  );
}
