import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  deviceLocation: [],
};

export const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICE_LOCATION: {
      return {
        ...state,
        deviceLocation: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default locationsReducer;
