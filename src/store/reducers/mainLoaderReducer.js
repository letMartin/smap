import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  isMainLoaderOn: false,
};

export const mainLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MAIN_LOADER_SWITCH: {
      return {
        ...state,
        isMainLoaderOn: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default mainLoaderReducer;
