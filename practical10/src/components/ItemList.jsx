import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';

const ITEM_API = 'https://pokeapi.co/api/v2/item';

export default function ItemList() {
  const PAGE_SIZE = 30;
  const [items, setItems] = useState([]); // current page data
  const [allItems, setAllItems] = useState([]); // full list for search
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPage = (pageNum) => {
    const offset = (pageNum - 1) * PAGE_SIZE;
    const url = `${ITEM_API}?limit=${PAGE_SIZE}&offset=${offset}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = data.results.map((i) => {
          const idMatch = i.url.match(/\/item\/(\d+)\//);
          const id = idMatch ? idMatch[1] : null;
          const image = i.name
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${i.name}.png`
            : '';
          return { ...i, id, image };
        });
        setTotalCount(data.count);
        return list;
      });
  };

  // Load current page when not searching
  useEffect(() => {
    if (search.trim() === '') {
      fetchPage(page).then(setItems).catch(console.error);
    }
  }, [page, search]);

  // Load full list for search
  useEffect(() => {
    if (search.trim() !== '') {
      if (allItems.length === 0) {
        const url = `${ITEM_API}?limit=2000`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const list = data.results.map((i) => {
              const idMatch = i.url.match(/\/item\/(\d+)\//);
              const id = idMatch ? idMatch[1] : null;
              const image = i.name
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${i.name}.png`
                : '';
              return { ...i, id, image };
            });
            setAllItems(list);
          })
          .catch(console.error);
      }
    } else {
      setAllItems([]);
    }
  }, [search]);

  // Reset page on search change
  useEffect(() => {
    setPage(1);
  }, [search]);

  const sourceList =
    search.trim() === ''
      ? items
      : allItems.filter((i) => i.name.toLowerCase().includes(search.trim().toLowerCase()));

  const totalPages = Math.ceil(
    (search.trim() === '' ? totalCount : sourceList.length) / PAGE_SIZE
  );

  // When not searching, items already represent the current page
  const displayed =
    search.trim() === ''
      ? items
      : sourceList.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE);

  return (
    <>
      <input
        type="search"
        placeholder="Search items…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        aria-label="Search items"
      />
      <div className="grid">
        {displayed.map((i) => (
          <ItemCard key={i.name} item={i} onSelect={setSelected} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
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
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
