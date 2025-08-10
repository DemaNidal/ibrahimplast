// src/components/ProductView/LocationList.jsx
import React from "react";

const LocationList = ({ locations }) => (
  <div className="location-list">
    {locations?.map((loc, idx) => (
      <span key={idx} className="location-badge">
        {loc.location} - {loc.warehouse_name}
      </span>
    ))}
  </div>
);

export default LocationList;
