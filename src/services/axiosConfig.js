import axios from "axios";

export const getHeaders = () => {
  const token = localStorage.getItem("smapToken");
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

axios.defaults.baseURL = "http://77.55.212.207:3000/";

export default axios;
