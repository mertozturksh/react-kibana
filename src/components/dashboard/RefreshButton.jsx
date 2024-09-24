import { Button } from '@mui/material';
import { MdRefresh } from "react-icons/md";

const RefreshButton = ({ onClick }) => {
  return (
    <Button variant="contained" startIcon={<MdRefresh />} sx={{ textTransform: 'none' }} onClick={onClick}>
      <span className='font-semibold'>Refresh</span>
    </Button>
  )
}

export default RefreshButton