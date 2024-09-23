import { Button } from '@mui/material';
import { MdRefresh } from "react-icons/md";

const RefreshButton = () => {
  return (
    <Button variant="contained" startIcon={<MdRefresh />} sx={{ textTransform: 'none' }}>
      <span className='font-semibold'>Refresh</span>
    </Button>
  )
}

export default RefreshButton