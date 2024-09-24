import React, { useRef, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";

import { Button, Paper, IconButton, Divider, InputBase } from '@mui/material';
import { MdExpandMore, MdOutlineCalendarMonth } from "react-icons/md";
import ChangeDateCard from './ChangeDateCard';

const DatePicker = ({ onChange }) => {

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [showChangeDateCard, setShowChangeDateCard] = useState(false);

  const buttonRef = useRef(null);
  const changeDateAreaRef = useClickAway((event) => {
    if (isSelectOpen || (buttonRef.current && buttonRef.current.contains(event.target))) {
      return;
    }
    setShowChangeDateCard(false);
  });

  const handleToggleChangeDateCard = () => {
    setShowChangeDateCard(!showChangeDateCard);
  };


  return (
    <>
      <div className="flex items-center">
        <Paper
          className='flex-grow'
          component="form"
          variant="outlined"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
          <IconButton color="primary" onClick={handleToggleChangeDateCard} ref={buttonRef}>
            <MdOutlineCalendarMonth />
            <MdExpandMore />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button edge='end' sx={{ textTransform: 'none' }}>
            <span className='font-semibold'>Select Date</span>
          </Button>
        </Paper>
      </div>

      {showChangeDateCard && (
        <ChangeDateCard
          areaRef={changeDateAreaRef}
          changeDateButtonRef={buttonRef}
        />
      )}

    </>
  );
};

export default DatePicker;