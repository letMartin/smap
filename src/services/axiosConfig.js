import axios from "axios";

export const token = localStorage.getItem("smapToken");

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export default axios;
