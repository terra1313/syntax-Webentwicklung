// src/components/FilterButtons.jsx

function FilterButtons({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { value: 'all', label: 'Alle' },
    { value: 'open', label: 'Offen' },
    { value: 'completed', label: 'Erledigt' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          type="button"
          key={filter.value}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label} ({counts[filter.value]})
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;