import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://send-me-a-postcard.firebaseio.com",
});

export default axiosInstance;
