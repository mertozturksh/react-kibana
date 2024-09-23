import React, { useRef, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { IconButton, Button, Chip, Card, CardContent, TextField } from '@mui/material';
import { MdOutlineFilterList, MdAdd } from "react-icons/md";

const Filters = ({ savedFilters, appliedFilters }) => {

  const [showAddFilterCard, setshowAddFilterCard] = useState(false);

  const addButtonRef = useRef(null);
  const addFilterArea = useClickAway(() => { setshowAddFilterCard(false); });

  return (
    <>
      <IconButton sx={{ border: '1px solid rgba(0, 0, 0, 0.23)' }} >
        <MdOutlineFilterList size={16} />
      </IconButton>

      <Button variant="text" startIcon={<MdAdd />} sx={{ textTransform: 'none' }} onClick={() => setshowAddFilterCard(true)} ref={addButtonRef}>
        <span className='font-semibold'>Add filter</span>
      </Button>

      <div className='flex items-center space-x-2'>
        {
          appliedFilters.map((item) => (
            <Chip
              key={item}
              label="Clickable Deletable"
              variant="outlined"
              onClick={() => { }}
              onDelete={() => { }}
            />
          ))
        }
      </div>

      {showAddFilterCard && (
        <Card
          ref={addFilterArea}
          sx={{ position: 'absolute', zIndex: 1, width: '300px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mt: 2, }}
          style={{ top: addButtonRef.current?.offsetTop + 40, left: addButtonRef.current?.offsetLeft }}
        >
          <CardContent>
            <TextField label="Filter Name" variant="outlined" size="small" fullWidth />
            <TextField label="Filter Value" variant="outlined" size="small" fullWidth sx={{ mt: 2 }} />
            <Button variant="contained" sx={{ mt: 2, textTransform: 'none' }}>Apply Filter</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Filters;