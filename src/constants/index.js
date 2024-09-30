
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
  { name: 'is', value: 'is' },
  { name: 'is not', value: 'is_not' },
  { name: 'is one of', value: 'one_of' },
  { name: 'is not one of', value: 'not_one_of' },
  // { name: 'exists', value: 'exists' },
  // { name: 'does not exists', value: 'not_exists' },
  // { name: 'greater than', value: 'greater' },
  // { name: 'less than', value: 'less' },
];

export const DUMMY_VALUES = [
  'sam', 'johnny', 'daniel', 'nicholas', 'elizabeth', 'kira'
];