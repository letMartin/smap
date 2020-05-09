import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import { initMap } from "../../settings/mapSettings";

import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";
import CustomButton from "../../components/CustomButton/CustomButton";
import PostcardViewer from "../../components/PostcardViewer/PostcardViewer";

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
    postcard: null,
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

  componentDidUpdate(prevProps) {
    console.log("TODO ::: INFO IF NO POSTCRDS AVAILABLE");
    let prevLen = 0;
    let nextLen = 0;
    if (
      this.props.postcardsData !== null &&
      Object.entries(this.props.postcardsData).length > 0
    ) {
      nextLen = Object.entries(this.props.postcardsData).length;
    }
    if (
      prevProps.postcardsData !== null &&
      Object.entries(prevProps.postcardsData).length > 0
    ) {
      prevLen = Object.entries(prevProps.postcardsData).length;
    }
    console.log("debug ::: ", nextLen, prevLen);
    if (nextLen > prevLen) {
      this.handleAddPostcardMarkers(this.props.postcardsData);
    }
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  };

  handleAddPostcardMarkers(postcards) {
    for (let key in postcards) {
      const { location, date, sender } = postcards[key];
      markers.addLayer(
        L.marker(location, { icon: mailIcon })
          .on("click", () => this.handleOpenPostcard(postcards[key]))
          .bindTooltip(`From ${sender} on ${date}`, { direction: "top" })
      );
    }
    markers.addTo(this.map);
  }

  handleOpenPostcard(postcard) {
    this.setState({
      isPostcardOpen: true,
      postcardImageLoaded: false,
      postcard,
    });
  }

  handleClosePostcard() {
    console.log("ok ok ok ok");
    this.setState({
      isPostcardOpen: false,
      postcardImageLoaded: false,
      postcard: null,
    });
  }

  handleOpenPostcardCreator() {
    this.props.switchModalAction(true);
  }

  handlePostcardImageLoaded() {
    this.setState({
      postcardImageLoaded: true,
    });
  }

  render() {
    const { layer, isPostcardOpen, postcard, postcardImageLoaded } = this.state;
    return (
      <>
        <div className="my-map__container" id="map-main">
          {!this.props.isModalOpen && (
            <div style={{ display: "flex" }}>
              <AddPostcardButton
                onAddPostcardClick={() => this.handleOpenPostcardCreator()}
              />
              <h2 className="my-map__title">Send me a postcard</h2>
            </div>
          )}
          {layer && (
            <CustomButton
              content="Continue to postcard"
              onButtonClick={() => this.handleContinueToPostcard()}
            />
          )}
        </div>
        {postcard && (
          <PostcardViewer
            open={isPostcardOpen}
            postcard={postcard}
            isLoaded={postcardImageLoaded}
            onClose={() => this.handleClosePostcard()}
            onImageReady={() => this.handlePostcardImageLoaded()}
          />
        )}
      </>
    );
  }
}

export default MyMap;
