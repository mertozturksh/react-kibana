import React from 'react';
import { useClickAway } from "@uidotdev/usehooks";

import { Card, Typography, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { MdVisibility, MdVisibilityOff, MdDelete } from "react-icons/md";

const ChangeFiltersCard = ({ setShow, buttonRef, onClickEnableAll, onClickDisableAll, onClickRemoveAll }) => {

  const handleAction = (action) => {
    return () => {
      action();
      setShow(false);
    };
  };

  const filterActions = [
    { type: 'button', name: 'Enable all', icon: MdVisibility, action: handleAction(onClickEnableAll) },
    { type: 'button', name: 'Disable all', icon: MdVisibilityOff, action: handleAction(onClickDisableAll) },
    { type: 'divider' },
    { type: 'button', name: 'Remove all', icon: MdDelete, action: handleAction(onClickRemoveAll) },
  ];

  const areaRef = useClickAway((event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }
    setShow(false);
  });

  return (
    <Card
      ref={areaRef}
      sx={{ position: 'absolute', zIndex: 1, width: '180px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', }}
      style={{ top: buttonRef.current?.offsetTop + 40, left: buttonRef.current?.offsetLeft }}
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
          <ListItem button="true" key={index} onClick={item.action} >
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