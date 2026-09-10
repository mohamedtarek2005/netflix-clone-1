import { useState } from 'react';

export default function SearchBar({ onSearch, autoFocus, onBlur, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        placeholder="Search titles..."
        style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #555', background: '#111', color: '#fff' }}
      />
    </form>
  );
}
