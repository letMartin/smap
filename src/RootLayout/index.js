import { connect } from "react-redux";

import RootLayout from "./RootLayout";

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    isUserEditModalOpen: state.modal.isUserEditModalOpen,
    isAuth: state.auth.isAuth,
    isMainLoaderOn: state.mainLoader.isMainLoaderOn,
  };
};

export default connect(mapStateToProps, null)(RootLayout);
