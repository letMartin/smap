import * as actionTypes from "./actionTypes";
import axios from "../../services/axiosConfig";

export const getPostcards = () => {
  return (dispatch) => {
    axios
      .get("/postcards.json")
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
      .post("/postcards.json", postcard)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
};

export const saveImage = (file) => {
  const data = new FormData();
  data.append("data", file);
  axios
    .post("/files/upload", data)
    .then((res) => {
      console.log("Image saved ", res);
    })
    .catch((error) => {
      console.log("Error image not saved ", error);
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
  sendPostcard,
};
