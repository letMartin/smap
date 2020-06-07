import RootLayout from "./RootLayout";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, null)(RootLayout);
