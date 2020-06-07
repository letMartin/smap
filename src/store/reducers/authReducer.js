import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  isAuth: !!localStorage.getItem("smapToken"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER: {
      return {
        ...state,
        isAuth: !!localStorage.getItem("smapToken"),
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
