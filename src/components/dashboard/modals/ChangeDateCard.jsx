import React from 'react';
import { useClickAway } from "@uidotdev/usehooks";

import { Card, Typography, Divider } from '@mui/material';

const ChangeDateCard = ({ setShow, buttonRef, onChange }) => {

  const areaRef = useClickAway((event) => {
    if ((buttonRef.current && buttonRef.current.contains(event.target))) {
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
          Change date...
        </Typography>
      </div>
      <Divider />
    </Card>
  )
}

export default ChangeDateCard