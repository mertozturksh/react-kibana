import React, { useEffect, useMemo, useReducer } from 'react';
import { dataReducer } from '../../reducers/dataReducer';
import { fetchAnimeList, fetchSavedFilterList } from '../../api/index';
import { flattenObjectOrArray, applyFilters } from '../../utils/index';
import { MOCK_DATA } from '../../constants/data';

import DataTable from '../../components/dashboard/DataTable';
import DatePicker from '../../components/dashboard/DatePicker';
import FilterChip from '../../components/dashboard/FilterChip';
import RefreshButton from '../../components/dashboard/RefreshButton';
import SaveAndSearch from '../../components/dashboard/SaveAndSearch';
import ChangeAndAddButtons from '../../components/dashboard/ChangeAndAddButtons';

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
      const response = MOCK_DATA;
      const flattenedData = flattenObjectOrArray(response);
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

        <ChangeAndAddButtons
          fields={state.fields.filter(item => item.filterable)}
          onAddFilter={handleAddFilter}
          onUpdateFilter={handleUpdateFilter}
          onRemoveAllFilters={handleRemoveAllFilters}
          onEnableAllFilters={handleEnableAllFilters}
          onDisableAllFilters={handleDisableAllFilters}
          retrieveFieldValues={retrieveFieldValues}
        />

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

        {/* FIELD SELECTOR OFFCANVAS */}
        {state.appliedFilters.map((item, index) => (
          <FilterChip
            key={index}
            keyName={index}
            filter={item}
            onClick={() => { }}
            onDelete={() => handleRemoveFilter(item)}
          />
        ))}
      </div>

      <div className='flex items-center my-4 px-4 w-full'>
        <DataTable
          data={filteredData}
        />
      </div>
    </>
  );
};

export default Dashboard;