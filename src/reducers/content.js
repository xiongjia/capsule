import { types as actTypes } from '../actions';

const initState = {
  isLoading: true,
  data: [],
  error: false
};

export default (state = initState, action) => {
  switch (action.type) {
  case actTypes.RCV_CONTENT:
    return {
      ...state,
      isLoading: false,
      data: action.data,
      error: false
    };
  case actTypes.RCV_CONTENT_ERR:
    return { 
      ...state,
      isLoading: false,
      error: true,
      data: []
    };
  default:
    return state;
  }
};
