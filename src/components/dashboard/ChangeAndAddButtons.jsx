import React, { useRef, useState } from 'react';

import { ButtonGroup, Button } from '@mui/material';
import { MdAddCircle, MdOutlineFilterList } from "react-icons/md";

import ChangeFiltersCard from './modals/ChangeFiltersCard';
import EditFilterCard from './modals/EditFilterCard';

const ChangeAndAddButtons = ({ fields, onAddFilter, onUpdateFilter, onRemoveAllFilters, onEnableAllFilters, onDisableAllFilters, retrieveFieldValues }) => {

  const [showAddFilterCard, setShowAddFilterCard] = useState(false);
  const [showChangeFiltersCard, setShowChangeFiltersCard] = useState(false);

  const addFilterButtonRef = useRef(null);
  const changeFiltersButtonRef = useRef(null);

  const handleToggleAddFilterCard = () => {
    setShowAddFilterCard(!showAddFilterCard);
  };
  const handleToggleChangeFiltersCard = () => {
    setShowChangeFiltersCard(!showChangeFiltersCard);
  };

  return (
    <>
      <ButtonGroup size="large" aria-label="Small button group" sx={{ backgroundColor: '#f1f1f1' }}>
        <Button sx={{ padding: '10px' }} ref={changeFiltersButtonRef} onClick={handleToggleChangeFiltersCard}>
          <MdOutlineFilterList size={18} />
        </Button>
        <Button sx={{ padding: '10px' }} ref={addFilterButtonRef} onClick={handleToggleAddFilterCard}>
          <MdAddCircle size={18} />
        </Button>
      </ButtonGroup>

      {showChangeFiltersCard && (
        <ChangeFiltersCard
          setShow={setShowChangeFiltersCard}
          buttonRef={changeFiltersButtonRef}
          onClickEnableAll={onEnableAllFilters}
          onClickDisableAll={onDisableAllFilters}
          onClickRemoveAll={onRemoveAllFilters}
        />
      )}

      {showAddFilterCard && (
        <EditFilterCard
          fields={fields}
          setShow={setShowAddFilterCard}
          buttonRef={addFilterButtonRef}
          onSave={onAddFilter}
          retrieveFieldValues={retrieveFieldValues}
        />
      )}
    </>
  )
}

export default ChangeAndAddButtons