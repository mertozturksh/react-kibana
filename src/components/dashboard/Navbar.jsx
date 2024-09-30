import React, { useRef, useState } from 'react';
import { AppBar, Toolbar, Button, Tooltip } from '@mui/material';

import { MdCheck, MdOutlineSave } from "react-icons/md";
import OpenFilterButtonCard from './modals/OpenFilterButtonCard';
import SaveFilterButtonCard from './modals/SaveFilterButtonCard';

const Navbar = ({ savedFilters, saveButtonDisabled, onSave, onApplySavedFilter, onDeleteSavedFilter }) => {

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center space-x-5">
            <Button
              color="primary"
              variant="outlined"
              size="small"
              sx={{ borderColor: '#e0e0e0', backgroundColor: '#e3f2fd', textTransform: 'none', fontSize: '0.875rem', }}
            >
              <span className='font-semibold'>Discover Data</span>
            </Button>

            <MdCheck />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="text" sx={{ textTransform: 'none', fontWeight: 'bold' }}>Options</Button>
            <Button variant="text" sx={{ textTransform: 'none', fontWeight: 'bold' }}>New</Button>

            <OpenFilterButtonCard
              savedFilters={savedFilters}
              onApplySavedFilter={onApplySavedFilter}
              onDeleteSavedFilter={onDeleteSavedFilter}
            />

            <SaveFilterButtonCard
              onSave={onSave}
              disabled={saveButtonDisabled}
            />

          </div>
        </Toolbar>
      </AppBar>

    </>
  );
};

export default Navbar;
