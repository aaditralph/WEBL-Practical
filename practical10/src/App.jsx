import { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import ItemList from './components/ItemList';

function App() {
  const [tab, setTab] = useState('pokedex');

  const renderContent = () => {
    switch (tab) {
      case 'items':
        return <ItemList />;
      case 'pokedex':
      default:
        return <PokemonList />;
    }
  };

  return (
    <div className="app-container">
      <nav className="tabs-nav">
        <button
          className={tab === 'pokedex' ? 'active' : ''}
          onClick={() => setTab('pokedex')}
        >
          Pokédex
        </button>
        <button
          className={tab === 'items' ? 'active' : ''}
          onClick={() => setTab('items')}
        >
          Items
        </button>
      </nav>
      <h1>{tab === 'pokedex' ? 'Pokédex' : 'Items'}</h1>
      {renderContent()}
    </div>
  );
}

export default App;
