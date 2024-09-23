import { TextField, Button, InputAdornment } from '@mui/material';
import { MdExpandMore, MdOutlineSave } from "react-icons/md";

const SaveAndSearch = () => {
  return (
    <div className="flex items-center flex-grow">
      <TextField
        variant="outlined"
        placeholder="Search"
        className="flex-grow"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button edge='start' startIcon={<MdOutlineSave />} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.06)', }}>
                <MdExpandMore />
              </Button>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button edge='end' sx={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
                <span className='font-semibold'>KQL</span>
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SaveAndSearch;