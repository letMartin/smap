import PassEditor from "./PassEditor";
import { connect } from "react-redux";

import { switchPassEditorAction } from "../../store/actions/modal";

const mapDispatchToProps = {
  switchPassEditorAction,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    isPassEditModalOpen: state.modal.isPassEditModalOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PassEditor);
