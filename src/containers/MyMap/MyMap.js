import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";
import CustomButton from "../../components/CustomButton/CustomButton";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./MyMap.scss";

const markers = new L.markerClusterGroup();

const deviceIcon = L.icon({
  iconUrl: initMap.urls.deviceIcon,
  iconSize: [34, 34],
});

class MyMap extends Component {
  state = {
    layer: null,
    position: {
      center: [52, 16],
      zoom: 8,
      zoomControl: false,
    },
  };

  static propTypes = {
    postcardsData: propTypes.object,
    isModalOpen: propTypes.bool,
  };

  componentDidMount() {
    this.map = L.map("map-main", this.state.position);
    this.handleTileLayer();
    this.props.getPostcards();
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  };

  handleAddUserPosition = (devicePosition) => {
    if (this.state.layer) {
      markers.removeLayer(this.state.layer);
    }
    const layer = L.marker(devicePosition, { icon: deviceIcon });
    markers.addLayer(layer);
    markers.addTo(this.map);
    this.map.panTo(devicePosition);
    this.map.setView(devicePosition, 11);
    this.setState({ layer });
  };

  handleAddPostcardClick() {
    this.setState({ isLocationLoading: true });
    this.getPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        const location = {
          latitude,
          longitude,
        };
        const devicePosition = [latitude, longitude];
        this.handleAddUserPosition(devicePosition);
        this.setState({ isLocationLoading: false, location });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  handleContinueToPostcard() {
    this.props.switchModalAction(true);
  }

  render() {
    const { layer } = this.state;
    return (
      <div className="my-map__container" id="map-main">
        {!layer && (
          <AddPostcardButton
            onAddPostcardClick={() => this.handleAddPostcardClick()}
          />
        )}
        {layer && (
          <CustomButton
            content="Continue to postcard"
            onButtonClick={() => this.handleContinueToPostcard()}
          />
        )}
      </div>
    );
  }
}

export default MyMap;
