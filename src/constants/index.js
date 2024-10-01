
const fieldStructure = {
  id: 0,
  name: '',
  filterable: true,
};

const filterStructure = {
  enabled: true,
  field: null,
  operator: null,
  value: null,
  label: null,
};

const savedFieldStructure = {
  name: null,
  filters: [], //[filterStructure,],
};

const operatorStructure = {
  name: '',
  value: '',
};


export const OPERATORS = [
  { name: 'is', value: 'is', negation: false },
  { name: 'is not', value: 'is_not', negation: true },
  { name: 'is one of', value: 'one_of', negation: false },
  { name: 'is not one of', value: 'not_one_of', negation: true },
  // { name: 'exists', value: 'exists', negation: false },
  // { name: 'does not exists', value: 'not_exists', negation: true },
  // { name: 'greater than', value: 'greater', negation: false },
  // { name: 'less than', value: 'less', negation: false },
];

export const DUMMY_VALUES = [
  'sam', 'johnny', 'daniel', 'nicholas', 'elizabeth', 'kira'
];