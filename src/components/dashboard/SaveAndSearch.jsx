import { Button, Paper, IconButton, Divider, InputBase } from '@mui/material';
import { MdExpandMore, MdOutlineSave } from "react-icons/md";

const SaveAndSearch = ({ onSave, onChange }) => {
  return (
    <div className="flex items-center flex-grow">

      <Paper
        className='flex-grow'
        component="form"
        variant="outlined"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <IconButton color="primary">
          <MdOutlineSave />
          <MdExpandMore />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button edge='end' sx={{ textTransform: 'none' }}>
          <span className='font-semibold'>KQL</span>
        </Button>
      </Paper>
    </div>
  );
};

export default SaveAndSearch;