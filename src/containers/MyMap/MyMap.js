import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";
import CustomButton from "../../components/CustomButton/CustomButton";
import PostcardViewer from '../../components/PostcardViewer/PostcardViewer'

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
  state = {
    layer: null,
    position: {
      center: [52, 16],
      zoom: 8,
      zoomControl: false,
    },
    isPostcardOpen: false,
    postcardImageLoaded: false,
    postcardImageUrl: ''
  };

  static propTypes = {
    postcardsData: propTypes.object,
    isModalOpen: propTypes.bool,
  };

  componentDidMount() {
    this.map = L.map("map-main", this.state.position);
    this.handleTileLayer();
    this.props.getPostcards()
  }

  componentDidUpdate(prevProps) {
    const prevLen = Object.entries(prevProps.postcardsData).length
    const nextLen = Object.entries(this.props.postcardsData).length
    if (nextLen > prevLen) {
      this.handleAddPostcardMarkers(this.props.postcardsData)
    }
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  };

  handleAddPostcardMarkers(postcards) {
    for (let key in postcards) {
      const { location, date, sender } = postcards[key]
      markers
        .addLayer(L.marker(location, { icon: mailIcon })
          .on('click', () => this.handleOpenPostcard(postcards[key]))
          .bindTooltip(`From ${sender} on ${date}`, { direction: 'top' }));
    }
    markers.addTo(this.map);
  }

  handleOpenPostcard(postcard) {
    console.log(postcard)
    this.setState({
      isPostcardOpen: true,
      postcardImageLoaded: false,
      postcardImageUrl: postcard.url
    })
  }

  handleOpenPostcardCreator() {
    this.props.switchModalAction(true);
  }

  handlePostcardImageLoaded() {
    this.setState({
      postcardImageLoaded: true
    })
  }

  render() {
    const { layer, isPostcardOpen, postcardImageUrl, postcardImageLoaded } = this.state;
    return (
      <>
        <div className="my-map__container" id="map-main">
          {!this.props.isModalOpen && (
            <div style={{ display: 'flex' }}>
              <AddPostcardButton
                onAddPostcardClick={() => this.handleOpenPostcardCreator()}
              />
              <h2 style={{ zIndex: 1000, color: '#4caf50' }}>Send me a postcard</h2>
            </div>
          )}
          {layer && (
            <CustomButton
              content="Continue to postcard"
              onButtonClick={() => this.handleContinueToPostcard()}
            />
          )}
        </div>
        <PostcardViewer
          open={isPostcardOpen}
          imgUrl={postcardImageUrl}
          isLoaded={postcardImageLoaded}
          onImageReady={() => this.handlePostcardImageLoaded()} />
      </>
    );
  }
}

export default MyMap;
