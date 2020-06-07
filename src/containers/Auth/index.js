import { connect } from "react-redux";
import { registerUser, authUser } from "../../store/actions/auth";
import { switchUserModalAction } from "../../store/actions/modal";

import Auth from "./Auth";

const mapDispatchToProps = {
  switchUserModalAction,
  registerUser,
  authUser,
};

const mapStateToProps = (state) => {
  return {
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    isUserModalOpen: state.modal.isUserModalOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
