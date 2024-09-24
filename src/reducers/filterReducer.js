export const filterReducer = (state, action) => {
  switch (action.type) {

    case 'SET_FIELD':
      return { ...state, field: action.field };
    case 'SET_OPERATOR':
      return { ...state, operator: action.operator };
    case 'SET_VALUE':
      return { ...state, value: action.value };

    case 'TOGGLE_CREATECUSTOMLABEL':
      return { ...state, createCustomLabel: !state.createCustomLabel };
    case 'SET_CUSTOMLABEL':
      return { ...state, label: action.label };

    case 'CLEAR':
      return { ...state, field: null, operator: null, value: null, createCustomLabel: false, label: null };


    default:
      return state;
  }
};