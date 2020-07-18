import { toast } from "react-toastify";

import * as actionTypes from "./actionTypes";
import axios, { getHeaders } from "../../services/axiosConfig";
import { handleHttpError } from "../../utilities/httpErrors";

export const getPostcards = (isReceived) => {
  const params = isReceived ? "type=RECEIVED" : "type=SENT";
  const warning = isReceived
    ? "You have no received postcards"
    : "You have no sent postcards";

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/postcards?${params}`, getHeaders())
        .then((res) => {
          dispatch(getPostcardsAction(res.data));
          if (!res.data.length) toast.warn(warning);
          resolve();
        })
        .catch((error) => {
          handleHttpError(error);
          reject();
        });
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
        handleHttpError(error);
        reject(error);
      });
  });
};

export const markAsRead = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/postcards/${id}/mark-as-read`, undefined, getHeaders())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        handleHttpError(error);
        reject(error);
      });
  });
};

export const getPostcardsStatistics = () => {
  const getReceived = axios.get("/postcards?type=RECEIVED", getHeaders());
  const getSent = axios.get("/postcards?type=SENT", getHeaders());
  return (dispatch) => {
    Promise.all([getReceived, getSent])
      .then((res) => {
        const userStatistics = makeUserStatistics(res[0].data, res[1].data);
        dispatch(getUserStatisticsAction(userStatistics));
      })
      .catch((error) =>
        handleHttpError(error, "Error while getting user statistics")
      );
  };
};

const makeUserStatistics = (received, sent) => {
  const result = {};
  result.totalReceived = received.length;
  result.totalSent = sent.length;
  result.newReceived = received.filter((el) => !el.read).length;
  return result;
};

export const getUserStatisticsAction = (data) => {
  return {
    type: actionTypes.GET_USER_STATISTICS,
    data,
  };
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

export const newPostcardsSwitchAction = (data) => {
  return {
    type: actionTypes.SHOW_NEW_POSTCARDS,
    data,
  };
};

export const actions = {
  getPostcards,
  getImage,
};
