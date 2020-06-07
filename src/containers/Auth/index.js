import Auth from "./Auth";
import { connect } from "react-redux";
import { registerUser, authUser } from "../../store/actions/auth";

const mapDispatchToProps = {
  registerUser,
  authUser,
};

export default connect(null, mapDispatchToProps)(Auth);
