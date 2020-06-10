import * as actionTypes from "./actionTypes";
import axios, { getHeaders } from "../../services/axiosConfig";
import { handleHttpError } from "../../utilities/httpErrors";

export const getUsers = () => {
  return (dispatch) => {
    axios
      .get("/users", getHeaders())
      .then((res) => {
        dispatch(getUsersAction(res.data));
      })
      .catch((err) => {
        handleHttpError(err);
      });
  };
};

export const getUsersAction = (data) => {
  return {
    type: actionTypes.GET_USERS,
    data,
  };
};

export const actions = {
  getUsers,
};
