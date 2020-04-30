import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./MyMap.scss";

const markers = new L.markerClusterGroup();

const mailIcon = L.icon({
  iconUrl: initMap.urls.mailIcon,
  iconSize: [34, 34],
});

class MyMap extends Component {
  state = {};

  static propTypes = {
    postcardsData: propTypes.object,
  };

  componentDidMount() {
    this.map = L.map("map", initMap.position);
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
    [1, 2, 3, 4, 5, 6].forEach((el) => {
      markers.addLayer(L.marker([52, 16 + el], { icon: mailIcon }));
    });
    markers.addTo(this.map);
    this.props.getPostcards();
  }
  

  handleAddPostcardClick() {
    this.setState({ isLocationLoading: true });
    this.getPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        const location = {
          latitude,
          longitude,
        };
        markers.addLayer(L.marker([latitude, longitude], { icon: mailIcon }));
        markers.addTo(this.map);
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

  render() {
    return (
      <div className="my-map__container" id="map">
        <AddPostcardButton
          onAddPostcardClick={() => this.handleAddPostcardClick()}
        />
      </div>
    );
  }
}

export default MyMap;
