import { toast } from "react-toastify";

export const handleHttpError = (error) => {
  let message = "";

  if (error.response && error.response.status && error.response.statusText) {
    message = error.response.statusText;
  } else if (error.request) {
    message = "Network error occured";
  } else {
    message = error.message;
  }
  toast.error(message);

  if (
    error.response &&
    error.response.status &&
    error.response.status === 401
  ) {
    localStorage.removeItem("smapToken");
    setTimeout(() => {
      window.location.reload();
    }, 2137);
  }
};
