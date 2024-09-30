import React, { useState } from 'react';
import { Button, IconButton, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import { MdDelete, MdContentCopy } from "react-icons/md";

import CustomPopper from '../../constants/CustomPopper';

const OpenFilterButtonCard = ({ savedFilters, onApplySavedFilter, onDeleteSavedFilter }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        Open
      </Button>

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>
          <div className='text-center mb-2'>
            <Typography variant='h7' fontWeight={'bold'} fontSize={14}>
              List of saved filters
            </Typography>
          </div>
          <Divider />

          <List sx={{ minWidth: '250px' }}>
            {savedFilters.map((item, index) => (
              <ListItem
                key={index}
              >
                <ListItemText primary={item.name} />
                <div className='ml-5 space-x-3'>
                  <IconButton edge="end" aria-label="apply" onClick={() => onApplySavedFilter(item.id)}>
                    <MdContentCopy />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDeleteSavedFilter(item.id)}>
                    <MdDelete />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </CustomPopper >
      )}
    </>
  );
};

export default OpenFilterButtonCard;
