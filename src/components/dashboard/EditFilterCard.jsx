import React, { useReducer } from 'react';
import { filterReducer } from '../../reducers/filterReducer';

import { OPERATORS } from '../../constants';

import { Button, Card, CardHeader, CardContent, CardActions, TextField, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Switch } from '@mui/material';

const initialState = {
  field: null,
  operator: null,
  value: null,
  createCustomLabel: false,
  label: '',
};

const EditFilterCard = ({ fields, areaRef, addFilterButtonRef, setIsSelectOpen, onClose, onSave, retrieveFieldValues }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);


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
      alert('please type a custom name.');
      return;
    }
    else {
      onSave({
        enabled: true,
        field: state.field,
        operator: state.operator,
        value: state.value,
        label: state.field + ' : ' + state.operator,
      });
    }
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
              {fields.map((item) => (
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>

          <div className="w-1/4">
            <InputLabel>Operator</InputLabel>
            <Select
              disabled={state.field ? false : true}
              displayEmpty
              value={state.operator || ''}
              onOpen={() => setIsSelectOpen(true)}
              onClose={() => setIsSelectOpen(false)}
              onChange={handleOperatorChange}
              sx={{ height: 40, backgroundColor: '#fafafa', width: '100%', minWidth: '120px' }}
            >
              <MenuItem disabled value="">Select an operator</MenuItem>
              {OPERATORS.map((item) => (
                <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>

        </div>

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
                sx={{ height: 40, backgroundColor: '#fafafa', width: '100%', minWidth: '120px' }}
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
  );
};

export default EditFilterCard;