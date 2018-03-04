import { combineReducers } from 'redux';
import { types as actTypes } from '../actions';

const initState = {
  isLoading: true,
  data: [],
  error: false
};

const content = (state = initState, action) => {
  switch (action.type) {
  case actTypes.RCV_CONTENT:
    return {
      ...state,
      isLoading: false,
      data: action.data
    };
  case actTypes.RCV_CONTENT_ERR:
    return { 
      ...state,
      isLoading: false,
      error: true
    };
  default:
    return state;
  }
};

export default combineReducers({ content });
