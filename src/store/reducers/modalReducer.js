import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  isModalOpen: false,
  isUserModalOpen: false,
  isUserEditModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_MODAL: {
      return {
        ...state,
        isModalOpen: action.data,
      };
    }
    case actionTypes.SWITCH_USER_MODAL: {
      return {
        ...state,
        isUserModalOpen: action.data,
      };
    }
    case actionTypes.SWITCH_USER_EDIT_MODAL: {
      return {
        ...state,
        isUserEditModalOpen: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
