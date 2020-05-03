import * as actionTypes from "./actionTypes";

export const getDeviceLocationAction = (data) => {
  return {
    type: actionTypes.GET_DEVICE_LOCATION,
    data,
  };
};

export const actions = {
  getDeviceLocationAction,
};
