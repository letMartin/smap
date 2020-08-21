import axios from "axios";

export const getHeaders = () => {
  const token = localStorage.getItem("smapToken");
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

const protocol = window.location.protocol
const origin = window.location.hostname

axios.defaults.baseURL = `${protocol}//${origin}:3000`

export default axios;
