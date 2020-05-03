import React, { Component } from "react";
import propTypes from "prop-types";

import "./DeviceLocation.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

import { initMap } from "../../settings/mapSettings";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const deviceIcon = L.icon({
  iconUrl: initMap.urls.deviceIcon,
  iconSize: [34, 34],
});

class DeviceLocation extends Component {
  state = {
    position: {
      center: [50, 10],
      zoom: 8,
      zoomControl: false,
    },
    layer: null,
  };

  static propTypes = {
    getDeviceLocation: propTypes.func,
    deviceLocation: propTypes.array,
  };

  componentDidMount() {
    this.mapDevice = L.map("map-device", this.state.position);
    this.handleTileLayer();
    this.getDevicePosition();
  }

  componentWillUnmount() {
    this.mapDevice.remove();
    this.mapDevice = null;
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.mapDevice
    );
  };

  getDevicePosition = () => {
    this.setState({ isLocationLoading: true });
    const { deviceLocation } = this.props;
    if (this.props.deviceLocation.length) {
      this.handleAddDevicePosition(deviceLocation);
    } else {
      this.getPosition()
        .then((position) => {
          const { latitude, longitude } = position.coords;
          const devicePosition = [latitude, longitude];
          this.handleAddDevicePosition(devicePosition);
          this.props.getDeviceLocationAction(devicePosition);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  handleAddDevicePosition = (devicePosition) => {
    const layer = L.marker(devicePosition, { icon: deviceIcon }).addTo(
      this.mapDevice
    );
    this.mapDevice.panTo(devicePosition);
    this.mapDevice.setView(devicePosition, 11);
    this.setState({ layer });
  };

  render() {
    const { deviceLocation } = this.props;
    return (
      <>
        <div id="map-device" className="step-content__container"></div>
        {deviceLocation.length === 0 && (
          <div className="step-content__container--spinner">
            <h3>Getting location</h3>
            <h3>Enable location on your device</h3>
            <CircularProgress />
          </div>
        )}
      </>
    );
  }
}

export default DeviceLocation;
