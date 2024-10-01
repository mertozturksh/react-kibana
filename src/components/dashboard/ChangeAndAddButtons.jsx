import React from 'react';

import { ButtonGroup } from '@mui/material';
import ChangeFilterButtonCard from './modals/ChangeFilterButtonCard';
import AddFilterButtonCard from './modals/AddFilterButtonCard';

const ChangeAndAddButtons = ({ fields, onAddFilter, onRemoveAllFilters, onEnableAllFilters, onDisableAllFilters, retrieveFieldValues }) => {

  return (
    <>
      <ButtonGroup size="large" aria-label="Small button group" sx={{ backgroundColor: '#f1f1f1' }}>

        <ChangeFilterButtonCard
          onClickEnableAll={onEnableAllFilters}
          onClickDisableAll={onDisableAllFilters}
          onClickRemoveAll={onRemoveAllFilters}
        />
        
        <AddFilterButtonCard
          fields={fields}
          onSave={onAddFilter}
          retrieveFieldValues={retrieveFieldValues}
        />

      </ButtonGroup>
    </>
  );
};

export default ChangeAndAddButtons;