import React from "react";
import "./FilterBar.css";

function FilterBar({ filter, setFilter, search, setSearch, nearby, setNearby }) {
  const filters = ["All", "Science", "Arts", "Commerce", "Vocational"];
  return (
    <div className="filter-bar">
      <div className="filters">
        {filters.map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Find specific courses"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      <label className="nearby-toggle">
        <input
          type="checkbox"
          checked={nearby}
          onChange={() => setNearby(!nearby)}
        />
        Show only nearby colleges
      </label>
    </div>
  );
}

export default FilterBar;
