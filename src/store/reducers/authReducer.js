import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  isAuth: !!localStorage.getItem("smapToken"),
  user: JSON.parse(localStorage.getItem("smapUser")),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER: {
      return {
        ...state,
        isAuth: !!localStorage.getItem("smapToken"),
      };
    }
    case actionTypes.GET_USER: {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("smapUser")),
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
