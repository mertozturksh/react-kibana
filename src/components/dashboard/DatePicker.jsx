import React, { useRef, useState } from 'react';

import { ButtonGroup, Button, Paper, InputBase } from '@mui/material';
import { MdExpandMore, MdOutlineCalendarMonth } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import ChangeDateCard from './modals/ChangeDateCard';

const DatePicker = ({ onChange }) => {

  const buttonRef = useRef(null);
  const [showChangeDateCard, setShowChangeDateCard] = useState(false);

  const handleToggleChangeDateCard = () => {
    setShowChangeDateCard(!showChangeDateCard);
  };

  const handleDateChange = () => {

  };

  return (
    <>
      <div className="flex items-center">
        <Paper
          className='flex-grow'
          component="form"
          variant="outlined"
          sx={{ p: '0', display: 'flex', alignItems: 'center' }}
        >
          <ButtonGroup variant='text' size="large" aria-label="Small button group" sx={{ backgroundColor: '#f1f1f1' }}>
            <Button sx={{ padding: '10px' }} ref={buttonRef} onClick={handleToggleChangeDateCard}>
              <MdOutlineCalendarMonth size={20} />
              <MdExpandMore size={20} />
            </Button>
          </ButtonGroup>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Last 15 minutes"
          />
          <ButtonGroup variant='text' size="large" aria-label="Small button group" sx={{ backgroundColor: '#f1f1f1' }}>
            <Button sx={{ padding: '10px', textTransform: 'none' }}>
              <LuTimerReset size={20} />
            </Button>
          </ButtonGroup>
        </Paper>
      </div>

      {showChangeDateCard && (
        <ChangeDateCard
          setShow={setShowChangeDateCard}
          buttonRef={buttonRef}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

export default DatePicker;