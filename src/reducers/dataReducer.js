export const dataReducer = (state, action) => {
  switch (action.type) {

    case 'SET_INITIALIZED':
      return { ...state, initialized: true };

    case 'FETCH_DATA_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.data };
    case 'FETCH_DATA_FAILURE':
      return { ...state, loading: false, error: action.error };


    case 'ADD_APPLIEDFILTER':
      return {
        ...state,
        appliedFilters: state.appliedFilters.includes(action.filter)
          ? state.appliedFilters
          : [...state.appliedFilters, action.filter]
      };
    case 'UPDATE_SINGLE_APPLIEDFILTER': {
      const updatedFilters = state.appliedFilters.map((f) =>
        f === action.filter ? action.filter : f
      );
      return { ...state, appliedFilters: updatedFilters };
    }
    case 'UPDATE_ALL_APPLIEDFILTERS':
      return { ...state, appliedFilters: action.filters };
    case 'REMOVE_APPLIEDFILTER':
      return {
        ...state,
        appliedFilters: state.appliedFilters.filter(f => f !== action.filter)
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




    case 'FETCH_SAVEDFILTERS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SAVEDFILTERS_SUCCESS':
      return { ...state, loading: false, savedFilters: action.data };
    case 'FETCH_SAVEDFILTERS_FAILURE':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};