import { getSavedFilters, addSavedFilter, updateSavedFilter, deleteSavedFilter } from '../services/localStorageService';

export const dataReducer = (state, action) => {
  switch (action.type) {

    case 'SET_INITIALIZED':
      return { ...state, initialized: true };

    //#region data
    case 'FETCH_DATA_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_DATA_SUCCESS': {
      if (action.data.length > 0) {
        const fields = Object.keys(action.data[0]).map((field, index) => ({
          id: index, name: field, filterable: true
        }));
        return { ...state, loading: false, data: action.data, fields: fields };
      }
      return { ...state, loading: false, data: [], fields: [] };
    }
    case 'FETCH_DATA_FAILURE':
      return { ...state, loading: false, error: action.error };
    //#endregion

    //#region appliedFilters
    case 'ADD_APPLIEDFILTER':
      return {
        ...state,
        appliedFilters: state.appliedFilters.includes(action.filter)
          ? state.appliedFilters
          : [...state.appliedFilters, action.filter]
      };
    case 'UPDATE_SINGLE_APPLIEDFILTER': {
      const updatedFilters = state.appliedFilters.map((f) =>
        f.id === action.filter.id ? action.filter : f
      );
      return { ...state, appliedFilters: updatedFilters };
    }
    case 'UPDATE_ALL_APPLIEDFILTERS':
      return { ...state, appliedFilters: action.filters };
    case 'REMOVE_APPLIEDFILTER':
      return {
        ...state,
        appliedFilters: state.appliedFilters.filter(f => f.id !== action.filterId)
      };
    case 'REMOVE_ALL_APPLIEDFILTERS':
      return {
        ...state,
        appliedFilters: []
      };

    case 'ENABLE_ALL_APPLIEDFILTERS': {
      const enabledFilters = state.appliedFilters.map(filter => ({
        ...filter,
        enabled: true
      }));
      return { ...state, appliedFilters: enabledFilters };
    }
    case 'DISABLE_ALL_APPLIEDFILTERS': {
      const disabledFilters = state.appliedFilters.map(filter => ({
        ...filter,
        enabled: false
      }));
      return { ...state, appliedFilters: disabledFilters };
    }
    //#endregion

    //#region searchText and date
    case 'SET_SEARCHTEXT':
      return { ...state, searchText: action.searchText };

    case 'SET_DATE':
      return { ...state, date: action.date };
    //#endregion




    //#region savedFilters
    case 'FETCH_SAVEDFILTERS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SAVEDFILTERS_SUCCESS': {
      const savedFilters = getSavedFilters();
      return { ...state, loading: false, savedFilters: savedFilters };
    }
    case 'FETCH_SAVEDFILTERS_FAILURE':
      return { ...state, loading: false, error: action.error };


    case 'SAVE_FILTER': {
      addSavedFilter({
        name: action.name,
        filters: state.appliedFilters,
      });
      const savedFilters = getSavedFilters();
      return { ...state, savedFilters: savedFilters };
    }
    case 'APPLY_SAVEDFILTER': {
      var savedFilter = state.savedFilters.find(x => x.id === action.filterId);

      if (!savedFilter) {
        return state;
      }
      return { ...state, appliedFilters: savedFilter.filters };
    }
    case 'DELETE_SAVEDFILTER': {
      var savedFilters = deleteSavedFilter(action.filterId);
      return { ...state, savedFilters: savedFilters };
    }
    //#endregion

    default:
      return state;
  }
};