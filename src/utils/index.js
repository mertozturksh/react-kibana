
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