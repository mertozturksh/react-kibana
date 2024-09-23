import { TextField, Button, InputAdornment } from '@mui/material';
import { MdExpandMore, MdOutlineCalendarMonth } from "react-icons/md";

const DatePicker = () => {
  return (
    <div className="flex items-center">
      <TextField
        value={'Last 30 days'}
        variant="outlined"
        placeholder="Search"
        className="flex-grow"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button edge='start' startIcon={<MdOutlineCalendarMonth />} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
                <MdExpandMore />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default DatePicker;