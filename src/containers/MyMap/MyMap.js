import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import newPostcard from "../../store/images/postcard-new-icon.png";
import openPostcard from "../../store/images/postcard-open.png";

import "./MyMap.scss";
import { initMap } from "../../settings/mapSettings";
import AddPostcardButton from "../../components/AddPostcardButton/AddPostcardButton";
import CustomButton from "../../components/CustomButton/CustomButton";
import PostcardViewer from "../../components/PostcardViewer/PostcardViewer";

const markers = new L.markerClusterGroup();

const newPostcardIcon = L.icon({
  iconUrl: newPostcard,
  iconSize: [32, 32],
});

const openPostcardIcon = L.icon({
  iconUrl: openPostcard,
  iconSize: [32, 32],
});

class MyMap extends Component {
  state = {
    layer: null,
    position: {
      center: [52, 16],
      zoom: 6,
      zoomControl: false,
    },
    isPostcardOpen: false,
    postcardImageLoaded: false,
    postcard: null,
    layerGroup: null,
    postcardSide: "front",
  };

  static propTypes = {
    postcards: propTypes.array,
    image: propTypes.object,
    getImage: propTypes.func,
    isModalOpen: propTypes.bool,
  };

  componentDidMount() {
    this.map = L.map("map-main", this.state.position);
    this.handleTileLayer();
    this.props.getPostcards();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postcards > prevProps.postcards) {
      this.handleAddPostcardMarkers(this.props.postcards);
    }
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  };

  handleAddPostcardMarkers = (postcards) => {
    if (this.state.layerGroup) {
      markers.removeLayer(this.state.layerGroup);
    }

    postcards.forEach((postcard, index) => {
      const { localization, sender, shortDescription } = postcard;
      const icon = index % 2 ? newPostcardIcon : openPostcardIcon;

      markers.addLayer(
        L.marker(localization, { icon })
          .on("click", () => this.handleOpenPostcard(postcard))
          .bindTooltip(`${shortDescription} - from ${sender.userId}`, {
            direction: "top",
          })
      );
    });

    const layerGroup = L.layerGroup().addTo(this.map);

    markers.addTo(layerGroup);
    this.setState({ layerGroup });
  };

  handleOpenPostcard(postcard) {
    this.props.getImage(postcard.file.fileId);
    this.setState({
      isPostcardOpen: true,
      postcardImageLoaded: false,
      postcard,
    });
  }

  handlePostcardClick = (e) => {
    const { classList } = e.target;
    if (classList.contains("postcard-wrapper")) {
      this.handleClosePostcard();
    } else {
      const postcardSide =
        this.state.postcardSide === "front" ? "back" : "front";
      this.setState({ postcardSide });
    }
  };

  handleClosePostcard() {
    this.setState({
      isPostcardOpen: false,
      postcardImageLoaded: false,
      postcard: null,
      postcardSide: "front",
    });
  }

  handleOpenPostcardCreator() {
    this.props.switchModalAction(true);
  }

  handleChangeActiveView() {
    const activeView =
      this.state.activeView === "Received" ? "Sent" : "Received";
    this.setState({ activeView });
  }

  render() {
    const { layer, isPostcardOpen, postcard, postcardSide } = this.state;

    return (
      <>
        <div className="my-map__container" id="map-main">
          {!this.props.isModalOpen && (
            <div className="my-map__dashboard">
              <div className="my-map__add-postcard">
                <AddPostcardButton
                  onAddPostcardClick={() => this.handleOpenPostcardCreator()}
                />
                <h2 className="my-map__title">Send me a postcard</h2>
              </div>
            </div>
          )}
          {layer && (
            <CustomButton
              content="Continue to postcard"
              onButtonClick={() => this.handleContinueToPostcard()}
            />
          )}
        </div>
        {postcard && isPostcardOpen && (
          <PostcardViewer
            postcard={postcard}
            image={this.props.image}
            postcardSide={postcardSide}
            onPostcardClick={this.handlePostcardClick}
          />
        )}
      </>
    );
  }
}

export default MyMap;
