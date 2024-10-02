import React, { useState } from 'react';

import CustomPopper from '../../constants/CustomPopper';
import { MdAddCircle } from "react-icons/md";

import { Button } from '@mui/material';
import FilterModal from './FilterModal';

const AddFilterButtonCard = ({ fields, onSave, retrieveFieldValues }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCancel = () => {
    handleClick();
  };
  const handleSave = (values) => {
    onSave({ ...values, id: Date.now() });
    handleClick();
  };

  return (
    <>
      <Button sx={{ padding: '10px' }} onClick={handleClick}>
        <MdAddCircle size={18} />
      </Button>

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>

          <FilterModal
            title={'Add Filter'}
            fields={fields}
            retrieveFieldValues={retrieveFieldValues}
            onSave={handleSave}
            onCancel={handleCancel}
          />

        </CustomPopper>
      )}
    </>
  );
};

export default AddFilterButtonCard;