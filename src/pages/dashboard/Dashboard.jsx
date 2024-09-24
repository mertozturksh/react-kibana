import React, { useEffect, useReducer } from 'react';
import { dataReducer } from '../../reducers/dataReducer';
import { fetchAnimeList, fetchSavedFilterList } from '../../api/index';
import { flattenObjectOrArray } from '../../utils/index';

import SaveAndSearch from '../../components/dashboard/SaveAndSearch';
import DatePicker from '../../components/dashboard/DatePicker';
import Filters from '../../components/dashboard/Filters';
import RefreshButton from '../../components/dashboard/RefreshButton';
import Table from '../../components/dashboard/Table';

const initialState = {
  data: null,
  fields: null,
  savedFilters: null,
  appliedFilters: [],
  searchText: null,
  date: null,

  loading: false,
  error: null,
  initialized: false,
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

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
      const response = await fetchAnimeList();
      const flattenedData = flattenObjectOrArray(response.data);
      dispatch({ type: 'FETCH_DATA_SUCCESS', data: flattenedData });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
    }
  };
  const fetchSavedFilters = async () => {
    dispatch({ type: 'FETCH_SAVEDFILTERS_START' });
    try {
      const response = await fetchSavedFilterList();
      dispatch({ type: 'FETCH_SAVEDFILTERS_SUCCESS', data: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_SAVEDFILTERS_FAILURE', error: error.message });
    }
  };


  const handleAddFilter = (filter) => {
    dispatch({ type: 'ADD_APPLIEDFILTER', filter: filter });
  };
  const handleUpdateFilter = (filter) => {
    dispatch({ type: 'UPDATE_SINGLE_APPLIEDFILTER', filter: filter });
  };
  const handleRemoveFilter = (filter) => {
    dispatch({ type: 'REMOVE_APPLIEDFILTER', filter: filter });
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

  const handleSearchChange = () => {

  };
  const handleDateChange = () => {

  };
  const handleRefresh = () => {
    fetchData();
  };
  const handleSaveFilter = () => {

  };

  const retrieveFieldValues = (field) => {
    return [...new Set(
      state.data
        .map(item => item[field])
        .filter(value => value !== null && value !== undefined)
    )];
  };


  if (!state.initialized) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="flex items-center space-x-2 px-2 my-2 mt-4">

        <SaveAndSearch
          onSave={handleSaveFilter}
          onChange={handleSearchChange}
        />

        <DatePicker
          onChange={handleDateChange}
        />

        <RefreshButton
          onClick={handleRefresh}
        />

      </div>

      <div className='flex items-center space-x-3 px-2'>
        <Filters
          fields={state.fields}
          appliedFilters={state.appliedFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onUpdateFilter={handleUpdateFilter}
          onRemoveAllFilters={handleRemoveAllFilters}
          onEnableAllFilters={handleEnableAllFilters}
          onDisableAllFilters={handleDisableAllFilters}
          retrieveFieldValues={retrieveFieldValues}
        />
      </div>

      <div className='flex items-center mt-12 px-4 w-full'>
        <Table
          data={state.data}
          filters={state.appliedFilters}
        />
      </div>
    </>
  );
};

export default Dashboard;