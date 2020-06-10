import * as actionTypes from "./actionTypes";
import axios, { getHeaders } from "../../services/axiosConfig";

export const getPostcards = () => {
  return (dispatch) => {
    axios
      .get("/postcards", getHeaders())
      .then((res) => {
        dispatch(getPostcardsAction(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const sendPostcard = (postcard) => {
  return (dispatch) => {
    axios
      .post("/postcards", postcard, getHeaders())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const saveImage = (imgFile) => {
  const data = new FormData();
  data.append("file", imgFile);
  return new Promise((resolve, reject) => {
    axios
      .post("/files/upload", data, getHeaders())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("Error image not saved ", error);
        reject(error);
      });
  });
};

export const getPostcardsAction = (data) => {
  return {
    type: actionTypes.GET_POSTCARDS,
    data,
  };
};

export const mainLoaderSwitchAction = (data) => {
  return {
    type: actionTypes.MAIN_LOADER_SWITCH,
    data,
  };
};

export const actions = {
  getPostcards,
};
