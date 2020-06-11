import UserEditor from "./UserEditor";
import { connect } from "react-redux";

import { switchUserEditorAction } from "../../store/actions/modal";

const mapDispatchToProps = {
  switchUserEditorAction,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
    isUserEditModalOpen: state.modal.isUserEditModalOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor);
