import React, { useReducer } from 'react';
import { filterReducer } from '../../reducers/filterReducer';

import { Button, Card, CardHeader, CardContent, CardActions, TextField, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Switch } from '@mui/material';

const initialState = {
  field: null,
  operator: null,
  value: null,
  createCustomLabel: false,
  label: '',
};

const baseFilter = {
  enabled: true,
  field: null,
  operator: null,
  value: null,
  label: null,
};

const EditFilterCard = ({ areaRef, addFilterButtonRef, setIsSelectOpen, onClose }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);


  const handleFieldChange = (event) => {
    dispatch({ type: 'SET_FIELD', field: event.target.value });
  };
  const handleOperatorChange = (event) => {
    dispatch({ type: 'SET_OPERATOR', operator: event.target.value });
  };
  // add debounce
  const handleValueChange = (event) => {
    dispatch({ type: 'SET_VALUE', value: event.target.value });
  };

  const handleToggleCreateCustomLabel = () => {
    dispatch({ type: 'TOGGLE_CREATECUSTOMLABEL' });
  };
  // add debounce
  const handleCustomLabelChange = (value) => {
    dispatch({ type: 'SET_CUSTOMLABEL', label: value });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };
  const handleCancel = () => {
    handleClear();
    onClose();
  };
  const handleSave = () => {
    // handle submit then close
    onClose();
  };

  return (
    <Card
      ref={areaRef}
      sx={{ position: 'absolute', zIndex: 1, width: '800px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', }}
      style={{ top: addFilterButtonRef.current?.offsetTop + 40, left: addFilterButtonRef.current?.offsetLeft }}
    >
      <CardHeader
        title="Edit Filter"
      />
      <hr />
      <CardContent>
        <div className='flex items-center w-full space-x-4 mb-4'>

          <div className="flex-grow">
            <InputLabel>Field</InputLabel>
            <Select
              fullWidth
              displayEmpty
              value={state.field || ''}
              onOpen={() => setIsSelectOpen(true)}
              onClose={() => setIsSelectOpen(false)}
              onChange={handleFieldChange}
              sx={{ height: 40, backgroundColor: '#fafafa' }}
            >
              <MenuItem disabled value="">Select a field</MenuItem>
              <MenuItem value="clientip">clientip</MenuItem>
            </Select>
          </div>

          <div className="w-1/4">
            <InputLabel>Operator</InputLabel>
            <Select
              displayEmpty
              value={state.operator || ''}
              onOpen={() => setIsSelectOpen(true)}
              onClose={() => setIsSelectOpen(false)}
              onChange={handleOperatorChange}
              sx={{ height: 40, backgroundColor: '#fafafa', width: '100%', minWidth: '120px' }}
            >
              <MenuItem disabled value="">Select an operator</MenuItem>
              <MenuItem value="is">is</MenuItem>
              <MenuItem value="is not">is not</MenuItem>
            </Select>
          </div>

        </div>

        <InputLabel>Value</InputLabel>
        <TextField
          fullWidth
          value={state.value || ''}
          variant="outlined"
          onChange={handleValueChange}
          sx={{ '& .MuiOutlinedInput-root': { height: '40px', }, backgroundColor: '#fafafa' }}
        />

        <FormGroup className='mt-2 mx-2'>
          <FormControlLabel sx={{ width: 250 }} control={<Switch onChange={handleToggleCreateCustomLabel} />} label="Create custom label?" />
        </FormGroup>

      </CardContent>

      <CardActions className='flex justify-end space-x-4 mx-2'>
        <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleSave}>
          Save
        </Button>
      </CardActions>
    </Card>
  )
}

export default EditFilterCard