import React from 'react';
import { Card, Typography, Divider } from '@mui/material';

const ChangeDateCard = ({ areaRef, changeDateButtonRef }) => {
  return (
    <Card
      ref={areaRef}
      sx={{ position: 'absolute', zIndex: 1, width: '180px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', }}
      style={{ top: changeDateButtonRef.current?.offsetTop + 40, left: changeDateButtonRef.current?.offsetLeft }}
    >
      <div className='ml-4 my-3'>
        <Typography variant='h7' fontWeight={'bold'} fontSize={14}>
          Change date
        </Typography>
      </div>
      <Divider />

    </Card>
  )
}

export default ChangeDateCard