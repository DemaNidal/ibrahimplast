export function buildQuery(mappedFilters, searchTerm) {
  const params = new URLSearchParams();

  if (searchTerm) params.append("term", searchTerm);

  // نضيف الفلاتر مباشرة لأنها جاهزة باسماء backend
  Object.entries(mappedFilters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  return params.toString();
}
