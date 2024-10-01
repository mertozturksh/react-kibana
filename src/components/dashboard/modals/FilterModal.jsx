import React, { useState, useReducer, useEffect } from 'react';

import { filterReducer } from '../../../reducers/filterReducer';
import { OPERATORS } from '../../../constants';
import { Button, Paper, TextField, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Switch, Typography } from '@mui/material';

const initialState = {
  field: null,
  operator: null,
  value: null,
  createCustomLabel: false,
  label: '',
};

const setInitialState = (defaultValues) => {
  if (defaultValues) {
    return {
      field: defaultValues.field || null,
      operator: defaultValues.operator || null,
      value: defaultValues.value || null,
      createCustomLabel: true,
      label: defaultValues.label || '',
    }
  }
  else {
    return initialState;
  }
};

const FilterModal = ({ title, fields, defaultValues, onSave, onCancel, retrieveFieldValues }) => {
  const [state, dispatch] = useReducer(filterReducer, defaultValues, setInitialState);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleFieldChange = (event) => {
    handleClear();
    dispatch({ type: 'SET_FIELD', field: event.target.value });
  };
  const handleOperatorChange = (event) => {
    const selectedOperator = event.target.value;
    if (selectedOperator === 'one_of' || selectedOperator === 'not_one_of') {
      dispatch({ type: 'SET_OPERATOR', operator: selectedOperator });
      dispatch({ type: 'SET_VALUE', value: [] });
    } else {
      dispatch({ type: 'SET_OPERATOR', operator: selectedOperator });
      dispatch({ type: 'SET_VALUE', value: null });
    }
  };
  // add debounce
  const handleValueChange = (event) => {
    dispatch({ type: 'SET_VALUE', value: event.target.value });
  };

  const handleToggleCreateCustomLabel = () => {
    dispatch({ type: 'TOGGLE_CREATECUSTOMLABEL' });
  };
  // add debounce
  const handleCustomLabelChange = (event) => {
    dispatch({ type: 'SET_CUSTOMLABEL', label: event.target.value });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };
  const handleCancel = () => {
    handleClear();
    onCancel();
  };
  const handleSave = () => {

    if (!state.field || !state.operator || !state.value) {
      alert('please select the filter options.');
      return;
    }

    if (state.createCustomLabel) {
      // label required.
      if (state.label) {
        onSave({
          enabled: true,
          field: state.field,
          operator: state.operator,
          value: state.value,
          label: state.label,
        });
      }
      else {
        alert('please type a custom name.');
      }
    }
    else {
      onSave({
        enabled: true,
        field: state.field,
        operator: state.operator,
        value: state.value,
        label: state.field + ' : ' + state.value,
      });
    }
    handleClear();
  };


  return (
    <Paper sx={{ width: '800px', border: 'none', boxShadow: 'none' }}>
      <Typography variant='h6' sx={{ margin: '10px', marginTop: '0px' }}>
        {title}
      </Typography>
      <hr />
      <div className='flex items-center w-full space-x-4 my-4'>

        {/* FIELD SELECTOR */}
        <div className="flex-grow">
          <InputLabel>Field</InputLabel>
          <Select
            fullWidth
            displayEmpty
            value={state.field || ''}
            onOpen={() => setIsSelectOpen(true)}
            onClose={() => setIsSelectOpen(false)}
            onChange={handleFieldChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                },
              },
            }}
            sx={{ height: 40, backgroundColor: '#fafafa' }}
          >
            <MenuItem disabled value="">Select a field</MenuItem>
            {fields.map((item) => (
              <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </div>

        {/* OPERATOR SELECTOR */}
        <div className="w-1/4">
          <InputLabel>Operator</InputLabel>
          <Select
            disabled={state.field ? false : true}
            displayEmpty
            value={state.operator || ''}
            onOpen={() => setIsSelectOpen(true)}
            onClose={() => setIsSelectOpen(false)}
            onChange={handleOperatorChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                },
              },
            }}
            sx={{ height: 40, backgroundColor: '#fafafa', width: '100%', minWidth: '120px' }}
          >
            <MenuItem disabled value="">Select an operator</MenuItem>
            {OPERATORS.map((item) => (
              <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        </div>

      </div>

      {/* VALUE SELECTOR OR INPUT */}
      {state.field && state.operator && (
        <>
          <InputLabel>Value</InputLabel>
          {state.field && state.operator && (state.operator === 'is' || state.operator === 'is_not' || state.operator === 'one_of' || state.operator === 'not_one_of') && (
            <Select
              disabled={state.field && state.operator ? false : true}
              displayEmpty
              multiple={state.operator === 'one_of' || state.operator === 'not_one_of'}
              value={state.value || []}
              onOpen={() => setIsSelectOpen(true)}
              onClose={() => setIsSelectOpen(false)}
              onChange={handleValueChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: 'auto',
                  },
                },
              }}
              // renderValue={(selected) => (
              //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              //     {selected.map((value) => (
              //       <Chip key={value} label={value} variant="outlined" sx={{borderRadius: '6px'}} />
              //     ))}
              //   </Box>
              // )}
              sx={{ minHeight: 40, backgroundColor: '#fafafa', width: '100%', minWidth: '120px' }}
            >
              <MenuItem disabled value="">Select an value</MenuItem>
              {(retrieveFieldValues(state.field)).map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          )}

          {(state.operator === 'exists' || state.operator === 'not_exists') && (
            <TextField
              fullWidth
              value={state.value || ''}
              variant="outlined"
              onChange={handleValueChange}
              sx={{ '& .MuiOutlinedInput-root': { height: '40px', }, backgroundColor: '#fafafa' }}
            />
          )}

        </>
      )}

      {/* CUSTOM LABEL? */}
      <FormGroup className='my-2 mx-2'>
        <FormControlLabel sx={{ width: 250 }} control={<Switch checked={state.createCustomLabel} onChange={handleToggleCreateCustomLabel} />} label="Create custom label?" />
      </FormGroup>

      {/* CUSTOM LABEL VALUE */}
      {state.createCustomLabel && (
        <div className='mb-4'>
          <InputLabel>Custom Label</InputLabel>
          <TextField
            fullWidth
            value={state.label || ''}
            onChange={handleCustomLabelChange}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { height: '40px' }, backgroundColor: '#fafafa' }}
          />
        </div>
      )}


      <div className='flex justify-end space-x-4 mx-2'>
        <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleSave}>
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default FilterModal;