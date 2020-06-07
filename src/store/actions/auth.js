import * as actionTypes from "./actionTypes";
import axios from "../../services/axiosConfig";
import { toast } from "react-toastify";

import { handleHttpError } from "../../utilities/httpErrors";

export const authUser = (user) => {
  return (dispatch) => {
    axios
      .post("/auth/login", user)
      .then((res) => dispatch(getUser(res.data.accessToken)))
      .catch((err) => handleHttpError(err));
  };
};

export const getUser = (token) => {
  return (dispatch) => {
    axios
      .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(() => localStorage.setItem("smapToken", token))
      .then(() => dispatch(authUserAction()))
      .catch((err) => handleHttpError(err));
  };
};

export const registerUser = (user) => {
  return (dispatch) => {
    axios
      .post("/auth/register", user)
      .then(() => toast.success("User was created"))
      .catch((err) => toast.error("Error ocurred"));
  };
};

export const authUserAction = () => {
  return {
    type: actionTypes.AUTH_USER,
  };
};
