import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-left" autoClose={3000} />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
