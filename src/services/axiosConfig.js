import axios from "axios";

export const getHeaders = () => {
  const token = localStorage.getItem("smapToken");
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

axios.defaults.baseURL = "http://localhost:3000";

export default axios;
