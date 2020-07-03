import * as actionTypes from "./actionTypes";
import axios, { getHeaders } from "../../services/axiosConfig";
import { handleHttpError } from "../../utilities/httpErrors";

export const getPostcards = () => {
  return (dispatch) => {
    axios
      .get("/postcards", getHeaders())
      .then((res) => {
        dispatch(getPostcardsAction(res.data));
      })
      .catch((error) => {
        handleHttpError(error);
      });
  };
};

export const getImage = (id) => {
  return (dispatch) => {
    axios
      .get(`/files/${id}`, getHeaders())
      .then((res) => {
        dispatch(getImageAction(res.data));
      })
      .catch((error) => {
        handleHttpError(error);
      });
  };
};

export const sendPostcard = (postcard) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/postcards", postcard, getHeaders())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
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

export const getImageAction = (data) => {
  return {
    type: actionTypes.GET_IMAGE,
    data,
  };
};

export const mainLoaderSwitchAction = (data) => {
  return {
    type: actionTypes.MAIN_LOADER_SWITCH,
    data,
  };
};

export const receivedPostcardsSwitchAction = (data) => {
  return {
    type: actionTypes.SHOW_RECEIVED_POSCARDS,
    data,
  };
};

export const allPostcardsSwitchAction = (data) => {
  return {
    type: actionTypes.SHOW_ALL_POSTCARDS,
    data,
  };
};

export const actions = {
  getPostcards,
  getImage,
};
