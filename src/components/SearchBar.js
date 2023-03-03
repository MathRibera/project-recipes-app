import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search Bar"
      />
    </div>
  );
}
