import React from 'react';
import { Chip } from '@mui/material';

// TODO
// customize for filter attributes. eg: operator type and data...
const FilterChip = ({ keyName, filter, onClick, onDelete }) => {
  return (
    <Chip
      label={filter.label}
      variant="outlined"
      onClick={onClick}
      onDelete={onDelete}
      sx={{ borderRadius: '8px' }}
    />
  );
};

export default FilterChip;