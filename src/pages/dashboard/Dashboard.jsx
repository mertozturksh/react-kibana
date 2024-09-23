import React, { useEffect, useReducer } from 'react';
import { fetchAnimeList, fetchSavedFilterList } from '../../api/index';
import { dataReducer } from '../../reducers/dataReducer';

import SaveAndSearch from '../../components/dashboard/SaveAndSearch';
import DatePicker from '../../components/dashboard/DatePicker';
import Filters from '../../components/dashboard/Filters';
import RefreshButton from '../../components/dashboard/RefreshButton';


const initialState = {
  data: null,
  savedFilters: null,
  appliedFilters: [1,2,3],

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
      dispatch({ type: 'FETCH_DATA_SUCCESS', data: response.data });
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



  const handleFilterAdd = () => {

  };
  const handleFilterRemove = () => {

  };
  const handleFilterUpdate = () => {

  };
  const handleSearchChange = () => {

  };
  const handleDateChange = () => {

  };
  const handleRefresh = () => {

  };



  if (!state.initialized) {
    return <p>Loading...</p>
  };
  return (
    <>
      <div className="flex items-center space-x-2 px-2 my-2">

        <SaveAndSearch />

        <DatePicker />

        <RefreshButton />

      </div>

      <div className='flex items-center space-x-3 px-2'>
        <Filters savedFilters={state.savedFilters} appliedFilters={state.appliedFilters} />
      </div>
    </>
  );
};

export default Dashboard;