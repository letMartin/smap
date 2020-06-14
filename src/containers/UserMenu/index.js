import UserMenu from "./UserMenu";
import { connect } from "react-redux";

import {
  switchUserEditorAction,
  switchPassEditorAction,
} from "../../store/actions/modal";

const mapDispatchToProps = {
  switchUserEditorAction,
  switchPassEditorAction,
};

const mapStateToProps = (state) => {
  return {
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    postcards: state.postcards.postcards,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
