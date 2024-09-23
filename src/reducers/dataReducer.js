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