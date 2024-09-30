import React, { useState } from 'react';

import CustomPopper from '../../constants/CustomPopper';
import { MdVisibility, MdVisibilityOff, MdDelete, MdOutlineFilterList } from "react-icons/md";
import { Button, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const ChangeFilterButtonCard = ({ onClickEnableAll, onClickDisableAll, onClickRemoveAll }) => {

  const handleAction = (action) => {
    return () => {
      action();
      handleClick();
    };
  };
  const filterActions = [
    { type: 'button', name: 'Enable all', icon: MdVisibility, action: handleAction(onClickEnableAll) },
    { type: 'button', name: 'Disable all', icon: MdVisibilityOff, action: handleAction(onClickDisableAll) },
    { type: 'divider' },
    { type: 'button', name: 'Remove all', icon: MdDelete, action: handleAction(onClickRemoveAll) },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);


  // const areaRef = useClickAway((event) => {
  //   if (isSelectOpen || (buttonRef.current && buttonRef.current.contains(event.target))) {
  //     return;
  //   }
  //   setShow(false);
  // });

  return (
    <>
      <Button sx={{ padding: '10px' }} onClick={handleClick}>
        <MdOutlineFilterList size={18} />
      </Button>

      {open && (
        <CustomPopper open={open} anchorEl={anchorEl} placement='bottom-start'>
          <div className='text-center mb-2'>
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
        </CustomPopper>
      )}
    </>
  );
};

export default ChangeFilterButtonCard;