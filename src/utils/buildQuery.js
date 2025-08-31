// src/utils/buildQuery.js
export function buildQuery(filters, searchTerm, lookups) {
  const { categories, madeFrom, warehouses, usages } = lookups;
  const params = new URLSearchParams();

  // term
  if (searchTerm) params.append("term", searchTerm);

  // usage
  if (filters.selectedUsage) {
    const label = usages.find(u => u.value === filters.selectedUsage)?.label;
    if (label) params.append("usage_name", label);
  }

  // categories
  if (filters.selectedCategories?.length) {
    const labels = filters.selectedCategories
      .map(val => categories.find(c => c.value === val)?.label)
      .filter(Boolean)
      .join(",");
    if (labels) params.append("category", labels);
  }

  // madeFrom
  if (filters.selectedMadeFrom) {
    const label = madeFrom.find(m => m.value === filters.selectedMadeFrom)?.label;
    if (label) params.append("made_from", label);
  }

  // warehouse
  if (filters.selectedWarehouse) {
    const label = warehouses.find(w => w.value === filters.selectedWarehouse)?.label;
    if (label) params.append("warehouse_name", label);
  }

  // size
  if (filters.size && filters.sizeUnit) {
    params.append("size_value", filters.size);
    params.append("sizeUnit", filters.sizeUnit);
  }

  return params.toString();
}
