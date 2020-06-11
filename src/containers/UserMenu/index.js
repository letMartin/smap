import UserMenu from "./UserMenu";
import { connect } from "react-redux";

import { switchUserEditorAction } from "../../store/actions/modal";

const mapDispatchToProps = {
  switchUserEditorAction,
};

const mapStateToProps = (state) => {
  return {
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
