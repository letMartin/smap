import { combineReducers } from "redux";
import postcardsReducer from "./postcardsReducer";
import mainLoaderReducer from "./mainLoaderReducer";
import modalReducer from './modalReducer';

export const rootReducer = combineReducers({
  postcards: postcardsReducer,
  mainLoader: mainLoaderReducer,
  modal: modalReducer,
});

export default rootReducer;
