import React, { useState } from 'react';

import CustomPopper from '../../constants/CustomPopper';
import { MdExpandMore, MdOutlineCalendarMonth } from "react-icons/md";
import { Button, Typography, TextField, Divider } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ChangeDateButtonCard = ({ onChange }) => {

  const [selectedDate, setSelectedDate] = useState(null);
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
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom'>
          <div className='text-center mb-2'>
            <Typography variant='h7' fontWeight={'bold'} fontSize={14}>
              Change date
            </Typography>
          </div>
          <Divider />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

        </CustomPopper>
      )}
    </>
  );
};

export default ChangeDateButtonCard;