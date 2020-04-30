import MyMap from "./MyMap";
import { connect } from "react-redux";
import { getPostcards, sendPostcard } from "../../store/actions/postcards";
import { switchModalAction } from '../../store/actions/modal';

const mapDispatchToProps = {
  getPostcards,
  sendPostcard,
  switchModalAction,
};

const mapStateToProps = (state) => {
  return {
    postcardsData: state.postcards.postcards,
    isModalOpen: state.modal.isModalOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
