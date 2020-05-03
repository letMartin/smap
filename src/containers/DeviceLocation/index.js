import DeviceLocation from "./DeviceLocation";
import { connect } from "react-redux";
import { getDeviceLocationAction } from "../../store/actions/locations";

const mapStateToProps = (state) => {
  return {
    deviceLocation: state.locations.deviceLocation,
  };
};

const mapDispatchToProps = {
  getDeviceLocationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceLocation);
