import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  usersList: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS: {
      return {
        ...state,
        usersList: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;
