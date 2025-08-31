import React from "react";

function UsageFilter({ usages, selectedUsage, onChange }) {
  return (
 <div className="filter-group">
        <h4>الاستخدام</h4>
        {usages.map((us) => {
          const id = `usage-${us.value}`;
          return (
            <div
              key={us.value}
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
                name="usages"
                value={us.value}
                checked={selectedUsage=== us.value}
onChange={() => onChange( us.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {us.label}
              </label>
            </div>
          );
        })}
      </div>
  );
}

export default UsageFilter;
