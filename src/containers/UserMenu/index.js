import UserMenu from "./UserMenu";
import { connect } from "react-redux";

import {
  switchUserEditorAction,
  switchPassEditorAction,
} from "../../store/actions/modal";

import {
  allPostcardsSwitchAction,
  receivedPostcardsSwitchAction,
} from "../../store/actions/postcards";

const mapDispatchToProps = {
  switchUserEditorAction,
  switchPassEditorAction,
  allPostcardsSwitchAction,
  receivedPostcardsSwitchAction,
};

const mapStateToProps = (state) => {
  return {
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    postcards: state.postcards.postcards,
    isAllPostcards: state.postcards.isAllPostcards,
    isReceivedPostcards: state.postcards.isReceivedPostcards,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
