import React from 'react';
import { Chip } from '@mui/material';

// TODO
// customize for filter attributes. eg: operator type and data...
const FilterChip = ({ keyName, filter, onClick, onDelete }) => {

  const negativeOperator = ['is_not', 'not_one_of', 'not_exists',].includes(filter.operator);

  const label = (
    <span>
      {negativeOperator && (
        <span style={{ color: '#ff1744', fontWeight: 'bold', marginRight: '4px' }}>NOT </span>
      )}
      {filter.label}
    </span>
  );

  return (
    <Chip
      label={label}
      variant="outlined"
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        borderRadius: '8px',
        opacity: filter.enabled ? 1 : 0.5,
        backgroundColor: filter.enabled ? '#default' : '#e0e0e0',
        borderColor: negativeOperator ? '#ff1744' : 'default',
      }}
    />
  );
};

export default FilterChip;