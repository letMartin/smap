import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  postcards: [],
  image: null,
  isReceivedPostcards: true,
  isAllPostcards: true,
};

export const postcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTCARDS: {
      return {
        ...state,
        postcards: action.data,
      };
    }
    case actionTypes.GET_IMAGE: {
      return {
        ...state,
        image: action.data,
      };
    }
    case actionTypes.SHOW_ALL_POSTCARDS: {
      return {
        ...state,
        isAllPostcards: action.data,
      };
    }
    case actionTypes.SHOW_RECEIVED_POSCARDS: {
      return {
        ...state,
        isReceivedPostcards: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default postcardsReducer;
