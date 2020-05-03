import { combineReducers } from "redux";
import postcardsReducer from "./postcardsReducer";
import mainLoaderReducer from "./mainLoaderReducer";
import modalReducer from "./modalReducer";
import locationsReducer from "./locationsReducer";

export const rootReducer = combineReducers({
  postcards: postcardsReducer,
  mainLoader: mainLoaderReducer,
  modal: modalReducer,
  locations: locationsReducer,
});

export default rootReducer;
