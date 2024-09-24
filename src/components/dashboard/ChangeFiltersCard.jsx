import React from 'react';

import { Card, Typography, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { MdVisibility, MdVisibilityOff, MdDelete } from "react-icons/md";

const ChangeFiltersCard = ({ areaRef, changeFiltersButtonRef, onClickEnableAll, onClickDisableAll, onClickRemoveAll }) => {

  const filterActions = [
    { type: 'button', name: 'Enable all', icon: MdVisibility, action: onClickEnableAll },
    { type: 'button', name: 'Disable all', icon: MdVisibilityOff, action: onClickDisableAll },
    { type: 'divider' },
    { type: 'button', name: 'Remove all', icon: MdDelete, action: onClickRemoveAll },
  ];

  return (
    <Card
      ref={areaRef}
      sx={{ position: 'absolute', zIndex: 1, width: '180px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', }}
      style={{ top: changeFiltersButtonRef.current?.offsetTop + 40, left: changeFiltersButtonRef.current?.offsetLeft }}
    >
      <div className='ml-4 my-3'>
        <Typography variant='h7' fontWeight={'bold'} fontSize={14}>
          Change all filters
        </Typography>
      </div>
      <Divider />

      {filterActions.map((item, index) => (
        item.type === 'divider' ? (
          <Divider key={index} />
        ) : (
          <ListItem button key={index} onClick={item.action} >
            <ListItemIcon>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        )
      ))}

    </Card>
  )
}

export default ChangeFiltersCard