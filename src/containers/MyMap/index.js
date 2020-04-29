import MyMap from "./MyMap";
import { connect } from "react-redux";
import { getPostcards, sendPostcard } from "../../store/actions/postcards";

const mapDispatchToProps = {
  getPostcards,
  sendPostcard,
};

const mapStateToProps = (state) => {
  return {
    postcardsList: state.postcards.postcards,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
