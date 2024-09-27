
export const flattenObjectOrArray = (input) => {

  if (Array.isArray(input)) {
    return input.map(item => flattenObject(item));
  }

  if (typeof input === 'object' && input !== null) {
    return flattenObject(input);
  }

  throw new Error('Input must be an object or an array');
}

export const flattenObject = (obj, parentKey = '', result = {}) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

export const applyFilters = (data, filters) => {
  if (!filters || filters.length === 0) {
    return data;
  }
  return filters.reduce((filteredData, filter) => {
    if (!filter.enabled) return filteredData;
    return applySingleFilter(filteredData, filter);
  }, data);
};

export const applySingleFilter = (data, filter) => {
  const { field, operator, value } = filter;

  return data.filter((item) => {
    const itemValue = item[field];

    switch (operator) {
      case 'is':
        return itemValue === value;

      case 'is_not':
        return itemValue !== value;

      case 'one_of':
        return Array.isArray(value) && value.includes(itemValue);

      case 'not_one_of':
        return Array.isArray(value) && !value.includes(itemValue);

      case 'exists':
        return itemValue !== undefined && itemValue !== null;

      case 'not_exists':
        return itemValue === undefined || itemValue === null;

      case 'greater':
        return Number(itemValue) > Number(value);

      case 'less':
        return Number(itemValue) < Number(value);

      default:
        return false;
    }
  });
};