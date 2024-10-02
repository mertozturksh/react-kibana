import React, { useEffect, useMemo, useReducer } from 'react';
import { dataReducer } from '../../reducers/dataReducer';
import { _fetchData } from '../../api/index';
import { flattenObjectOrArray, applyFilters } from '../../utils/index';

import Loader from '../../components/constants/Loader';
import Navbar from '../../components/dashboard/Navbar';
import DataTable from '../../components/dashboard/DataTable';
import FieldPanel from '../../components/dashboard/FieldPanel';
import DatePicker from '../../components/dashboard/DatePicker';
import FilterChip from '../../components/dashboard/FilterChip';
import RefreshButton from '../../components/dashboard/RefreshButton';
import SaveAndSearch from '../../components/dashboard/SaveAndSearch';
import ChangeAndAddButtons from '../../components/dashboard/ChangeAndAddButtons';

const initialState = {
  data: null,
  fields: null,
  savedFilters: [],
  appliedFilters: [],
  searchText: null,
  date: null,

  loading: false,
  error: null,
  initialized: false,
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const filteredData = useMemo(() => {
    if (!state.data || state.appliedFilters.length === 0) {
      return state.data;
    }

    return applyFilters(state.data, state.appliedFilters);
  }, [state.data, state.appliedFilters]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await fetchData();
    await fetchSavedFilters();
    dispatch({ type: 'SET_INITIALIZED' });
  };
  const fetchData = async () => {
    dispatch({ type: 'FETCH_DATA_START' });
    try {
      const response = _fetchData();
      const flattenedData = flattenObjectOrArray(response);
      dispatch({ type: 'FETCH_DATA_SUCCESS', data: flattenedData });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
    }
  };
  const fetchSavedFilters = async () => {
    dispatch({ type: 'FETCH_SAVEDFILTERS_START' });
    try {
      dispatch({ type: 'FETCH_SAVEDFILTERS_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'FETCH_SAVEDFILTERS_FAILURE', error: error.message });
    }
  };


  const handleAddFilter = (filter) => {
    console.log(filter);

    dispatch({ type: 'ADD_APPLIEDFILTER', filter });
  };
  const handleUpdateFilter = (filter) => {
    dispatch({ type: 'UPDATE_SINGLE_APPLIEDFILTER', filter });
  };
  const handleRemoveFilter = (filterId) => {
    dispatch({ type: 'REMOVE_APPLIEDFILTER', filterId });
  };
  const handleRemoveAllFilters = () => {
    dispatch({ type: 'REMOVE_ALL_APPLIEDFILTERS' });
  };
  const handleEnableAllFilters = () => {
    dispatch({ type: 'ENABLE_ALL_APPLIEDFILTERS' });
  };
  const handleDisableAllFilters = () => {
    dispatch({ type: 'DISABLE_ALL_APPLIEDFILTERS' });
  };

  const handleSaveFilter = (name) => {
    dispatch({ type: 'SAVE_FILTER', name: name });
  };
  const handleApplySavedFilter = (filterId) => {
    dispatch({ type: 'APPLY_SAVEDFILTER', filterId });
  };
  const handleDeleteSavedFilter = (filterId) => {
    dispatch({ type: 'DELETE_SAVEDFILTER', filterId });
  };

  const handleSearchChange = () => {

  };
  const handleDateChange = () => {

  };
  const handleRefresh = () => {
    fetchData();
  };

  const retrieveFieldValues = (field) => {
    return [...new Set(
      state.data
        .map(item => item[field])
        .filter(value => value !== null && value !== undefined)
    )];
  };


  if (!state.initialized) {
    return <Loader />
  }

  return (
    <div className='flex flex-col h-screen'>

      <Navbar
        saveButtonDisabled={state.appliedFilters.length === 0}
        savedFilters={state.savedFilters}
        onSave={handleSaveFilter}
        onApplySavedFilter={handleApplySavedFilter}
        onDeleteSavedFilter={handleDeleteSavedFilter}
      />

      <div className="flex items-center space-x-2 px-4 my-2">

        <ChangeAndAddButtons
          fields={state.fields.filter(item => item.filterable)}
          onAddFilter={handleAddFilter}
          onRemoveAllFilters={handleRemoveAllFilters}
          onEnableAllFilters={handleEnableAllFilters}
          onDisableAllFilters={handleDisableAllFilters}
          retrieveFieldValues={retrieveFieldValues}
        />

        <SaveAndSearch
          onChange={handleSearchChange}
        />

        <DatePicker
          onChange={handleDateChange}
        />

        <RefreshButton
          onClick={handleRefresh}
        />

      </div>

      <div className='flex items-center space-x-3 px-4'>
        {state.appliedFilters.map((item) => (
          <FilterChip
            key={item.id}
            filter={item}
            fields={state.fields.filter(item => item.filterable)}
            retrieveFieldValues={retrieveFieldValues}
            onDelete={handleRemoveFilter}
            onSave={handleUpdateFilter}
          />
        ))}
      </div>

      <div className='flex justify-between items-start my-2 px-4 space-x-3'>

        <div className='w-2/5 h-full'>
          <FieldPanel />
        </div>
        <div className=''>
          <DataTable
            data={filteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;