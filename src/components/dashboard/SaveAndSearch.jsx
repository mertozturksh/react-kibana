import React from 'react';
import { ButtonGroup, Button, Paper, IconButton, Divider, InputBase } from '@mui/material';
import { MdSearch } from "react-icons/md";

const SaveAndSearch = ({ onChange }) => {

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
            <Button>
              <span className='font-semibold'>KQL</span>
            </Button>
          </ButtonGroup>
        </Paper>
      </div>
    </>
  );
};

export default SaveAndSearch;