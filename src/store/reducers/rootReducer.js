import { combineReducers } from "redux";
import postcardsReducer from "./postcardsReducer";
import mainLoaderReducer from "./mainLoaderReducer";

export const rootReducer = combineReducers({
  postcards: postcardsReducer,
  mainLoader: mainLoaderReducer,
});

export default rootReducer;
