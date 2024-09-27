import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { MdCheck, MdOutlineSave } from "react-icons/md";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}
    >
      <Toolbar className="flex justify-between">
        <div className="flex items-center space-x-5">
          <Button
            color="primary"
            variant="outlined"
            size="small"
            sx={{ borderColor: '#e0e0e0', backgroundColor: '#e3f2fd', textTransform: 'none', fontSize: '0.875rem', }}
          >
            <span className='font-semibold'>Discover Data</span>
          </Button>

          <MdCheck />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="text" sx={{ textTransform: 'none', fontWeight: 'bold' }}>Options</Button>
          <Button variant="text" sx={{ textTransform: 'none', fontWeight: 'bold' }}>New</Button>
          <Button variant="text" sx={{ textTransform: 'none', fontWeight: 'bold' }}>Open</Button>
          <Button variant="contained" startIcon={<MdOutlineSave />} sx={{ textTransform: 'none', }}>
            <span className='font-medium'>Save</span>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
