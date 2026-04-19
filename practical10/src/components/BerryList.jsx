import React, { useEffect, useState } from 'react';
import BerryCard from './BerryCard';
import BerryModal from './BerryModal';

const BERRY_API = 'https://pokeapi.co/api/v2/berry';

export default function BerryList() {
  const PAGE_SIZE = 20;
  const [berries, setBerries] = useState([]); // current page data
  const [allBerries, setAllBerries] = useState([]); // full list for search
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPage = (pageNum) => {
    const offset = (pageNum - 1) * PAGE_SIZE;
    const url = `${BERRY_API}?limit=${PAGE_SIZE}&offset=${offset}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = data.results.map((b) => {
          const idMatch = b.url.match(/\/berry\/(\d+)\//);
          const id = idMatch ? idMatch[1] : null;
          return { ...b, id };
        });
        setTotalCount(data.count);
        return list;
      });
  };

  // Load current page when not searching
  useEffect(() => {
    if (search.trim() === '') {
      fetchPage(page).then(setBerries).catch(console.error);
    }
  }, [page, search]);

  // Load full list for search
  useEffect(() => {
    if (search.trim() !== '') {
      if (allBerries.length === 0) {
        const url = `${BERRY_API}?limit=2000`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const list = data.results.map((b) => {
              const idMatch = b.url.match(/\/berry\/(\d+)\//);
              const id = idMatch ? idMatch[1] : null;
              return { ...b, id };
            });
            setAllBerries(list);
          })
          .catch(console.error);
      }
    } else {
      setAllBerries([]);
    }
  }, [search]);

  // Reset page on search change
  useEffect(() => {
    setPage(1);
  }, [search]);

  const sourceList =
    search.trim() === ''
      ? berries
      : allBerries.filter((b) =>
          b.name.toLowerCase().includes(search.trim().toLowerCase())
        );

  const totalPages = Math.ceil(
    (search.trim() === '' ? totalCount : sourceList.length) / PAGE_SIZE
  );

  const startIdx = (page - 1) * PAGE_SIZE;
  const displayed = sourceList.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <>
      <input
        type="search"
        placeholder="Search berries…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        aria-label="Search berries"
      />
      <div className="grid">
        {displayed.map((b) => (
          <BerryCard key={b.name} berry={b} onSelect={setSelected} />
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
        <BerryModal berry={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
