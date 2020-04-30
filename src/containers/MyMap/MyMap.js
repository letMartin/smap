import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";
import CustomButton from '../../components/CustomButton/CustomButton'
import Modal from '../../components/Modal/Modal'

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./MyMap.scss";

const markers = new L.markerClusterGroup();

// const mailIcon = L.icon({
//   iconUrl: initMap.urls.mailIcon,
//   iconSize: [34, 34],
// });

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
    this.map = L.map("map", this.state.position);
    this.handleTileLayer()
    // [1, 2, 3, 4, 5, 6].forEach((el) => {
    //   markers.addLayer(L.marker([52, 16 + el], { icon: mailIcon }));
    // });
    // markers.addTo(this.map);
    this.props.getPostcards();
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  }

  handleAddUserPosition = (devicePosition) => {
    if (this.state.layer) {
      markers.removeLayer(this.state.layer)
    }
    const layer = L.marker(devicePosition, { icon: deviceIcon })
    markers.addLayer(layer);
    markers.addTo(this.map);
    this.map.panTo(devicePosition)
    this.map.setView(devicePosition, 11)
    this.setState({ layer })
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
        const devicePosition = [latitude, longitude]
        this.handleAddUserPosition(devicePosition)
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

  handleContinueToPostcard () {
    this.props.switchModalAction(true)
  }

  render() {
    const { layer } = this.state
    const { isModalOpen } = this.props
    return (
      <div className="my-map__container" id="map">
        {!layer && <AddPostcardButton
          onAddPostcardClick={() => this.handleAddPostcardClick()}
        />}
        {layer && <CustomButton content='Continue to postcard' onButtonClick={() => this.handleContinueToPostcard()} />}
        <Modal open={isModalOpen} />
      </div>
    );
  }
}

export default MyMap;
