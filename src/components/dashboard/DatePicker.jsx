import React from 'react';

import { ButtonGroup, Button, Paper, InputBase } from '@mui/material';
import { LuTimerReset } from "react-icons/lu";
import ChangeDateButtonCard from './modals/ChangeDateButtonCard';

const DatePicker = ({ onChange }) => {

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
            <ChangeDateButtonCard
              onChange={onChange}
            />
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
    </>
  );
};

export default DatePicker;