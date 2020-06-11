import * as actionTypes from "./actionTypes";

export const switchModalAction = (data) => {
  return {
    type: actionTypes.SWITCH_MODAL,
    data,
  };
};

export const switchUserModalAction = (data) => {
  return {
    type: actionTypes.SWITCH_USER_MODAL,
    data,
  };
};

export const switchUserEditorAction = (data) => {
  return {
    type: actionTypes.SWITCH_USER_EDIT_MODAL,
    data,
  };
};

export const actions = {
  switchModalAction,
  switchUserModalAction,
  switchUserEditorAction,
};
