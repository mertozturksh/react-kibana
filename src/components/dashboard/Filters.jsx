import React, { useRef, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { IconButton, Button } from '@mui/material';
import { MdOutlineFilterList, MdAdd } from "react-icons/md";
import EditFilterCard from './EditFilterCard';
import ChangeFiltersCard from './ChangeFiltersCard';
import FilterChip from './FilterChip';

const Filters = ({ fields, appliedFilters, onAddFilter, onUpdateFilter, onRemoveFilter, onRemoveAllFilters, onEnableAllFilters, onDisableAllFilters, retrieveFieldValues }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [showEditFilterCard, setShowEditFilterCard] = useState(false);
  const [showChangeFiltersCard, setShowChangeFiltersCard] = useState(false);

  const addFilterButtonRef = useRef(null);
  const addFilterAreaRef = useClickAway((event) => {
    if (isSelectOpen || (addFilterButtonRef.current && addFilterButtonRef.current.contains(event.target))) {
      return;
    }
    setShowEditFilterCard(false);
  });

  const changeFiltersButtonRef = useRef(null);
  const changeFiltersAreaRef = useClickAway((event) => {
    if (changeFiltersButtonRef.current && changeFiltersButtonRef.current.contains(event.target)) {
      return;
    }
    setShowChangeFiltersCard(false);
  });

  const handleToggleEditFilterCard = () => {
    setShowEditFilterCard(!showEditFilterCard);
  };
  const handleToggleChangeFiltersCard = () => {
    setShowChangeFiltersCard(!showChangeFiltersCard);
  };

  return (
    <>
      <IconButton color='primary' sx={{ border: '1px solid #cfcfcf' }} onClick={handleToggleChangeFiltersCard} ref={changeFiltersButtonRef}>
        <MdOutlineFilterList size={16} />
      </IconButton>

      <Button variant="text" startIcon={<MdAdd />} sx={{ textTransform: 'none' }} onClick={handleToggleEditFilterCard} ref={addFilterButtonRef}>
        <span className='font-semibold'>Add filter</span>
      </Button>

      <div className='flex items-center space-x-2'>
        {
          appliedFilters.map((item, index) => (
            <FilterChip
              key={index}
              keyName={index}
              filter={item}
              onClick={() => { }}
              onDelete={() => onRemoveFilter(item)}
            />
          ))
        }
      </div>

      {showChangeFiltersCard && (
        <ChangeFiltersCard
          areaRef={changeFiltersAreaRef}
          changeFiltersButtonRef={changeFiltersButtonRef}
          onClickEnableAll={onEnableAllFilters}
          onClickDisableAll={onDisableAllFilters}
          onClickRemoveAll={onRemoveAllFilters}
        />
      )}

      {showEditFilterCard && (
        <EditFilterCard
          fields={fields.filter(item => item.filterable)}
          areaRef={addFilterAreaRef}
          addFilterButtonRef={addFilterButtonRef}
          setIsSelectOpen={setIsSelectOpen}
          onClose={() => setShowEditFilterCard(false)}
          onSave={onAddFilter}
          retrieveFieldValues={retrieveFieldValues}
        />
      )}
    </>
  );
};

export default Filters;
