import React from "react";

function MadeFromFilter({ madeFrom, selectedMadeFrom, onChange }) {
  return (
  <div className="filter-group">
        <h4>مصنوع من</h4>
        {madeFrom.map((m) => {
          const id = `madeFrom-${m.value}`;
          return (
            <div
              key={m.value}
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
                name="madeFrom"
                value={m.value}
                checked={selectedMadeFrom===m.value}
                onChange={() => onChange(m.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {m.label}
              </label>
            </div>
          );
        })}
      </div>
  );
}

export default MadeFromFilter;
