import * as actionTypes from "./actionTypes";

export const mainLoaderSwitchAction = (data) => {
  return {
    type: actionTypes.MAIN_LOADER_SWITCH,
    data,
  };
};

export const actions = {
  mainLoaderSwitchAction,
};
