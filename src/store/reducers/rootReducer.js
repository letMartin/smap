import { combineReducers } from "redux";
import postcardsReducer from "./postcardsReducer";
import mainLoaderReducer from "./mainLoaderReducer";
import modalReducer from "./modalReducer";
import locationsReducer from "./locationsReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
  postcards: postcardsReducer,
  mainLoader: mainLoaderReducer,
  modal: modalReducer,
  locations: locationsReducer,
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
