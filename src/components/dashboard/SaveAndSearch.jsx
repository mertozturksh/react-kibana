import React, { useRef, useState } from 'react';
import { ButtonGroup, Button, Paper, IconButton, Divider, InputBase } from '@mui/material';
import { MdExpandMore, MdOutlineSave, MdAddCircle, MdOutlineFilterList, MdSearch } from "react-icons/md";

import SaveFilterCard from './modals/SaveFilterCard';

const SaveAndSearch = ({ onSave, onChange }) => {

  const [showSaveFilterCard, setShowSaveFilterCard] = useState(false);
  const saveFilterButtonRef = useRef(null);

  const handleToggleSaveFilterCard = () => {
    setShowSaveFilterCard(!showSaveFilterCard);
  };

  return (
    <>
      <div className="flex items-center space-x-2 flex-grow">

        <Paper
          className='flex-grow'
          component="form"
          variant="outlined"
          sx={{ p: '0', display: 'flex', alignItems: 'center' }}
        >
          <IconButton disabled>
            <MdSearch />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
          />
          <ButtonGroup variant='text' size="large" aria-label="Small button group" sx={{ backgroundColor: '#f1f1f1' }}>
            <Button sx={{ padding: '10px' }} ref={saveFilterButtonRef} onClick={handleToggleSaveFilterCard}>
              <MdOutlineSave size={20} />
              <MdExpandMore size={20} />
            </Button>
          </ButtonGroup>
        </Paper>
      </div>

      {showSaveFilterCard && (
        <SaveFilterCard
          setShow={setShowSaveFilterCard}
          buttonRef={saveFilterButtonRef}
        />
      )}

    </>
  );
};

export default SaveAndSearch;