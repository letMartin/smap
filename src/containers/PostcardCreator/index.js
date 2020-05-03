import PostcardCreator from "./PostcardCreator";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    deviceLocation: state.locations.deviceLocation,
  };
};

export default connect(mapStateToProps, null)(PostcardCreator);
