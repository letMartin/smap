import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  isModalOpen: false,
  isUserModalOpen: false,
  isUserEditModalOpen: false,
  isPassEditModalOpen: false,
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
    case actionTypes.SWITCH_PASS_EDIT_MODAL: {
      return {
        ...state,
        isPassEditModalOpen: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
