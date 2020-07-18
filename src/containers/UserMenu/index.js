import UserMenu from "./UserMenu";
import { connect } from "react-redux";

import {
  switchUserEditorAction,
  switchPassEditorAction,
} from "../../store/actions/modal";

import {
  getPostcardsStatistics,
  allPostcardsSwitchAction,
  newPostcardsSwitchAction,
  receivedPostcardsSwitchAction,
} from "../../store/actions/postcards";

const mapDispatchToProps = {
  switchUserEditorAction,
  switchPassEditorAction,
  getPostcardsStatistics,
  allPostcardsSwitchAction,
  newPostcardsSwitchAction,
  receivedPostcardsSwitchAction,
};

const mapStateToProps = (state) => {
  return {
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    postcards: state.postcards.postcards,
    userStatistics: state.postcards.userStatistics,
    isAllPostcards: state.postcards.isAllPostcards,
    isNewPostcards: state.postcards.isNewPostcards,
    isReceivedPostcards: state.postcards.isReceivedPostcards,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
