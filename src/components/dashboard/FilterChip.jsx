import React, { useState } from 'react';
import { Chip } from '@mui/material';

import CustomPopper from '../constants/CustomPopper';
import FilterModal from './modals/FilterModal';

const FilterChip = ({ fields, retrieveFieldValues, filter, onDelete, onSave }) => {

  const negativeOperator = ['is_not', 'not_one_of', 'not_exists',].includes(filter.operator);
  const label = (
    <span>
      {negativeOperator && (
        <span style={{ color: '#ff1744', fontWeight: 'bold', marginRight: '4px' }}>NOT </span>
      )}
      {filter.label}
    </span>
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCancel = () => {
    handleClick();
  };
  const handleSave = (values) => {
    onSave(values);
    handleClick();
  };

  return (
    <>
      <Chip
        label={label}
        variant="outlined"
        onClick={handleClick}
        onDelete={() => onDelete(filter.id)}
        sx={{
          borderRadius: '7px',
          opacity: filter.enabled ? 1 : 0.5,
          backgroundColor: filter.enabled ? '#default' : '#e0e0e0',
          borderColor: negativeOperator ? '#ff1744' : 'default',
        }}
      />

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>

          <FilterModal
            title={'Edit Filter'}
            fields={fields}
            defaultValues={filter}
            retrieveFieldValues={retrieveFieldValues}
            onSave={handleSave}
            onCancel={handleCancel}
          />

        </CustomPopper>
      )}
    </>
  );
};

export default FilterChip;