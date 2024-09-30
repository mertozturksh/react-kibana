import React, { useState } from 'react';

import CustomPopper from '../../constants/CustomPopper';
import { MdOutlineSave } from "react-icons/md";
import { Tooltip, Button, InputLabel, TextField } from '@mui/material';

const SaveFilterButtonCard = ({ disabled, onSave }) => {

  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCancel = () => {
    setName(null);
    handleClick();
  };
  const handleSave = () => {
    if (name) {
      onSave(name);
      setName(null);
      handleClick();
    }
  };

  return (
    <>
      <Tooltip title={disabled ? 'At least one filter is required.' : ''}>
        <span>
          <Button disabled={disabled} startIcon={<MdOutlineSave />} sx={{ textTransform: 'none', width: 100 }} variant="contained" onClick={handleClick}>
            <span className='font-medium'>Save</span>
          </Button>
        </span>
      </Tooltip>

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>
          <div className='my-3'>
            <InputLabel>Name</InputLabel>
            <TextField
              fullWidth
              value={name || ''}
              onChange={handleNameChange}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { height: '40px' }, minWidth: '300px', backgroundColor: '#fafafa' }}
            />
          </div>

          <div className='flex justify-between space-x-4'>
            <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleSave}>
              Save
            </Button>
          </div>
        </CustomPopper>
      )}
    </>
  )
}

export default SaveFilterButtonCard