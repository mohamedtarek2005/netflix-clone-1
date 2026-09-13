import { useEffect, useState } from 'react';

export default function SearchBar({
  onSearch,
  autoFocus,
  initialValue = '',
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = value.trim();

      if (query) {
        onSearch(query);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="search-form">
      <span className="search-icon">⌕</span>

      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Titles, people, genres"
        className="search-input"
      />
    </div>
  );
}