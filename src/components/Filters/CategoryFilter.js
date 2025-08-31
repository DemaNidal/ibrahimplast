import React from "react";

function CategoryFilter({ categories, selectedCategories, onChange, onClear }) {
  return (
    <div className="filter-group">
      <div className="row">
        <div className="col">
          <h4>الفئة</h4>
        </div>
        <div className="col">
          <button onClick={onClear} style={{ color: "#C49A6C" }}>
            مسح الكل
          </button>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((cat) => {
          const id = `category-${cat.value}`;
          return (
            <div key={cat.value} className="form-check">
              <input
                id={id}
                type="checkbox"
                className="form-check-input"
                checked={selectedCategories.includes(cat.value)}
                onChange={() => onChange(cat.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {cat.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
