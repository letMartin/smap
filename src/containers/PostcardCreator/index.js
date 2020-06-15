import PostcardCreator from "./PostcardCreator";
import { connect } from "react-redux";
import { switchModalAction } from "../../store/actions/modal";
import { getPostcards } from "../../store/actions/postcards";
import { getUsers } from "../../store/actions/users";

const mapDispatchToProps = {
  switchModalAction,
  getPostcards,
  getUsers,
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    deviceLocation: state.locations.deviceLocation,
    user: state.auth.user,
    usersList: state.users.usersList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostcardCreator);
