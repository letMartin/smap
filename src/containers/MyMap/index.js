import MyMap from "./MyMap";
import { connect } from "react-redux";
import {
  getPostcards,
  sendPostcard,
  getImage,
} from "../../store/actions/postcards";
import { switchModalAction } from "../../store/actions/modal";

const mapDispatchToProps = {
  getImage,
  getPostcards,
  sendPostcard,
  switchModalAction,
};

const mapStateToProps = (state) => {
  return {
    postcards: state.postcards.postcards,
    image: state.postcards.image,
    isModalOpen: state.modal.isModalOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
