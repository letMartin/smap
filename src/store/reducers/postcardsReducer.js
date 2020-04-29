import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  postcards: [],
};

export const postcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTCARDS: {
      return {
        ...state,
        postcards: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default postcardsReducer;
