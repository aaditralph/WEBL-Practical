import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

export default function PokemonList() {
  const PAGE_SIZE = 90;
  const [pokemon, setPokemon] = useState([]); // current page data
  const [allPokemon, setAllPokemon] = useState([]); // full list for search
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Helper to fetch a page of Pokémon
  const fetchPage = (pageNum) => {
    const offset = (pageNum - 1) * PAGE_SIZE;
    const url = `${POKEMON_API}?limit=${PAGE_SIZE}&offset=${offset}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = data.results.map((p) => {
          const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
          const id = idMatch ? idMatch[1] : null;
          const image = id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            : '';
          return { ...p, id, image };
        });
        setTotalCount(data.count);
        return list;
      });
  };

  // Load current page when not searching
  useEffect(() => {
    if (search.trim() === '') {
      fetchPage(page).then(setPokemon).catch(console.error);
    }
  }, [page, search]);

  // Load full dataset when entering a search term (once per term)
  useEffect(() => {
    if (search.trim() !== '') {
      // If we haven't loaded all yet, fetch with a large limit
      if (allPokemon.length === 0) {
        const url = `${POKEMON_API}?limit=2000`; // enough to cover all
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const list = data.results.map((p) => {
              const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
              const id = idMatch ? idMatch[1] : null;
              const image = id
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                : '';
              return { ...p, id, image };
            });
            setAllPokemon(list);
          })
          .catch(console.error);
      }
    } else {
      // Clear full list when clearing search
      setAllPokemon([]);
    }
  }, [search]);

  // Reset to first page whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Determine which array to display and pagination based on search state
  const sourceList = search.trim() === '' ? pokemon : allPokemon.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(
    (search.trim() === '' ? totalCount : sourceList.length) / PAGE_SIZE
  );

  // When not searching we already have only the current page's data, so no need to slice further.
  const displayed = search.trim() === '' ? sourceList : sourceList.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE);

  return (
    <>
      <input
        type="search"
        placeholder="Search Pokémon…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        aria-label="Search Pokémon"
      />
      <div className="grid">
        {displayed.map((p) => (
          <PokemonCard key={p.name} pokemon={p} onSelect={setSelected} />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next ▶
        </button>
      </div>
      {selected && (
        <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
