import { toast } from "react-toastify";

export const handleHttpError = (error, customError = "") => {
  let message = "";

  if (error.response && error.response.status && error.response.statusText) {
    message = error.response.statusText;
  } else if (error.request) {
    message = "Network error occured";
  } else {
    message = error.message;
  }
  if (customError) {
    message += " - " + customError;
  }
  toast.error(message);

  if (
    error.response &&
    error.response.status &&
    error.response.status === 401 &&
    localStorage.getItem("smapToken")
  ) {
    localStorage.removeItem("smapToken");
    localStorage.removeItem("smapUser");
    setTimeout(() => {
      window.location.reload();
    }, 2137);
  }
};
