import PostcardCreator from "./PostcardCreator";
import { connect } from "react-redux";
import { switchModalAction } from "../../store/actions/modal";
import { getPostcards } from "../../store/actions/postcards";

const mapDispatchToProps = {
  switchModalAction,
  getPostcards,
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    deviceLocation: state.locations.deviceLocation,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostcardCreator);
