import { toast } from "react-toastify";

import * as actionTypes from "./actionTypes";
import axios from "../../services/axiosConfig";
import { handleHttpError } from "../../utilities/httpErrors";

import { mainLoaderSwitchAction } from "./mainLoader";
import { switchUserModalAction } from "./modal";

export const authUser = (user) => {
  return (dispatch) => {
    dispatch(mainLoaderSwitchAction(true));
    axios
      .post("/auth/login", user)
      .then((res) => {
        dispatch(getUser(res.data.accessToken));
      })
      .catch((err) => {
        handleHttpError(err);
        dispatch(mainLoaderSwitchAction(false));
      });
  };
};

export const getUser = (token) => {
  return (dispatch) => {
    axios
      .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(mainLoaderSwitchAction(false));
        localStorage.setItem("smapToken", token);
        localStorage.setItem("smapUser", JSON.stringify(res.data));
        dispatch(getUserAction());
        dispatch(authUserAction());
      })
      .catch((err) => {
        handleHttpError(err);
        dispatch(mainLoaderSwitchAction(false));
      });
  };
};

export const registerUser = (user) => {
  return (dispatch) => {
    dispatch(mainLoaderSwitchAction(true));
    axios
      .post("/auth/register", user)
      .then(() => {
        dispatch(mainLoaderSwitchAction(false));
        dispatch(switchUserModalAction(false));
        toast.success("User was created");
      })
      .catch((err) => {
        dispatch(mainLoaderSwitchAction(false));
        toast.error("Error ocurred");
      });
  };
};

export const authUserAction = () => {
  return {
    type: actionTypes.AUTH_USER,
  };
};

export const getUserAction = () => {
  return {
    type: actionTypes.GET_USER,
  };
};
