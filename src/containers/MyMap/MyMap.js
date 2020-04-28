import React, { Component } from "react";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

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
  componentDidMount() {
    this.map = L.map("map", initMap.position);
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
    [1, 2, 3, 4, 5, 6].forEach((el) => {
      markers.addLayer(L.marker([52, 16 + el], { icon: mailIcon }));
    });
    markers.addTo(this.map);
  }

  render() {
    return <div className="my-map__container" id="map"></div>;
  }
}

export default MyMap;
