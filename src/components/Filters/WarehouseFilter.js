import React from "react";

function MadeFromFilter({ warehouses, selectedWarehouse, onChange }) {
  return (
  <div className="filter-group">
        <h4>مكان التخزين</h4>
        {warehouses.map((w) => {
          const id = `warehouse-${w.value}`;
          return (
            <div
              key={w.value}
              className="form-check"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                id={id}
                type="radio"
                className="form-check-input"
                name="warehouse"
                value={w.value}
                checked={selectedWarehouse === w.value}
                onChange={() => onChange( w.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {w.label}
              </label>
            </div>
          );
        })}
      </div>
  );
}

export default MadeFromFilter;
