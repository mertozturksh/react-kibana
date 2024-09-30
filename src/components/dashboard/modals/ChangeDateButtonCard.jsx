import React, { useState } from 'react';

import CustomPopper from '../../constants/CustomPopper';
import { MdExpandMore, MdOutlineCalendarMonth } from "react-icons/md";
import { Button, Typography, Divider } from '@mui/material';


const ChangeDateButtonCard = ({ onChange }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Button sx={{ padding: '10px' }} onClick={handleClick}>
        <MdOutlineCalendarMonth size={20} />
        <MdExpandMore size={20} />
      </Button>

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>
          <div className='my-3'>
            <Typography variant='h7' fontWeight={'bold'} fontSize={14}>
              Change date
            </Typography>
          </div>
        </CustomPopper>
      )}
    </>
  );
};

export default ChangeDateButtonCard;