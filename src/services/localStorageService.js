const LocalStorageKeys = {
  SAVED_FILTERS: 'savedFilters',
  FILTERS: 'filters',
};

// -------------------
// Saved Filters İşlemleri
// -------------------

export const getSavedFilters = () => {
  const items = localStorage.getItem(LocalStorageKeys.SAVED_FILTERS);
  return items ? JSON.parse(items) : [];
};

export const addSavedFilter = (newFilter) => {
  const filters = getSavedFilters();
  const id = Date.now();
  const filterWithId = { id, ...newFilter };
  filters.push(filterWithId);
  localStorage.setItem(LocalStorageKeys.SAVED_FILTERS, JSON.stringify(filters));
  return filterWithId;
};

export const updateSavedFilter = (id, updatedFilter) => {
  const filters = getSavedFilters();
  const updatedFilters = filters.map(filter => {
    if (filter.id === id) {
      return { ...filter, ...updatedFilter };
    }
    return filter;
  });
  localStorage.setItem(LocalStorageKeys.SAVED_FILTERS, JSON.stringify(updatedFilters));
  return updatedFilters;
};

export const deleteSavedFilter = (id) => {
  const filters = getSavedFilters();
  const filteredFilters = filters.filter(filter => filter.id !== id);
  localStorage.setItem(LocalStorageKeys.SAVED_FILTERS, JSON.stringify(filteredFilters));
  return filteredFilters;
};



// -------------------
// Filters İşlemleri
// -------------------

export const getFilters = () => {
  const items = localStorage.getItem(LocalStorageKeys.FILTERS);
  return items ? JSON.parse(items) : [];
};

export const addFilter = (newFilter) => {
  const filters = getFilters();
  const id = Date.now();
  const filterWithId = { id, ...newFilter };
  filters.push(filterWithId);
  localStorage.setItem(LocalStorageKeys.FILTERS, JSON.stringify(filters));
  return filterWithId;
};

export const updateFilter = (id, updatedFilter) => {
  const filters = getFilters();
  const updatedFilters = filters.map(filter => {
    if (filter.id === id) {
      return { ...filter, ...updatedFilter };
    }
    return filter;
  });
  localStorage.setItem(LocalStorageKeys.FILTERS, JSON.stringify(updatedFilters));
  return updatedFilters;
};

export const deleteFilter = (id) => {
  const filters = getFilters();
  const filteredFilters = filters.filter(filter => filter.id !== id);
  localStorage.setItem(LocalStorageKeys.FILTERS, JSON.stringify(filteredFilters));
  return filteredFilters;
};
