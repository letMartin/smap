import * as actionTypes from "./actionTypes";

export const switchModalAction = (data) => {
  return {
    type: actionTypes.SWITCH_MODAL,
    data,
  };
};

export const actions = {
  switchModalAction
};
