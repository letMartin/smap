import React, { Component } from "react";
import propTypes from "prop-types";
import L from "leaflet";
import isEqual from "lodash/isEqual";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import newPostcard from "../../store/images/envelope.png";
import openPostcard from "../../store/images/location-pin.png";

import "./MyMap.scss";
import { initMap } from "../../settings/mapSettings";
import { markAsRead } from "../../store/actions/postcards";
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
    user: propTypes.object,
    getImage: propTypes.func,
    isModalOpen: propTypes.bool,
    isAllPostcards: propTypes.bool,
    isReceivedPostcards: propTypes.bool,
  };

  componentDidMount() {
    this.map = L.map("map-main", this.state.position);
    this.handleTileLayer();
    this.getPostcards(this.props.isReceivedPostcards);
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUpdatePostcards(prevProps, this.props)) {
      this.addPostcardMarkers(this.props.postcards);
    }
    if (prevProps.isReceivedPostcards !== this.props.isReceivedPostcards) {
      this.getPostcards(this.props.isReceivedPostcards);
    }
  }

  shouldUpdatePostcards(prevProps, props) {
    return (
      props.postcards.length > prevProps.postcards.length ||
      prevProps.isAllPostcards !== props.isAllPostcards ||
      !isEqual(this.props.postcards, prevProps.postcards)
    );
  }

  getPostcards(isReceived) {
    this.props
      .getPostcards(isReceived)
      .then(() => this.addPostcardMarkers(this.props.postcards));
  }

  handleTileLayer = () => {
    L.tileLayer(initMap.tileLayer.url, initMap.tileLayer.config).addTo(
      this.map
    );
  };

  addPostcardMarkers = (postcards) => {
    if (!postcards.length) return;

    let postcardsForRender = [...postcards];

    if (this.state.layerGroup) {
      markers.removeLayer(this.state.layerGroup);
    }

    if (!this.props.isAllPostcards) {
      postcardsForRender = this.filterPostcards(postcards);
    }

    postcardsForRender.forEach((postcard) => {
      const { localization, sender, shortDescription, read } = postcard;
      const icon = read ? openPostcardIcon : newPostcardIcon;

      markers.addLayer(
        L.marker(localization, { icon })
          .on("click", () => this.handleOpenPostcard(postcard))
          .bindTooltip(
            `${shortDescription} - from ${sender.name} ${sender.surname}`,
            {
              direction: "top",
            }
          )
      );
    });

    const layerGroup = L.layerGroup().addTo(this.map);

    markers.addTo(layerGroup);
    this.setState({ layerGroup });
  };

  filterPostcards(postcards) {
    const { user } = this.props;
    let filtered = [];

    if (this.props.isReceivedPostcards) {
      filtered = postcards.filter(
        (postcard) => postcard.sender.userId === user.userId
      );
    } else {
      postcards.forEach((postcard) => {
        postcard.receivers.forEach((receiver) => {
          if (receiver.userId === user.userId) {
            filtered.push(postcard);
          }
        });
      });
    }

    return filtered;
  }

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

  handleImageLoaded(postcard) {
    if (postcard.read) {
      return;
    }
    markAsRead(postcard.postcardId).then(() =>
      this.getPostcards(this.props.isReceivedPostcards)
    );
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
            onImgLoaded={(postcard) => this.handleImageLoaded(postcard)}
          />
        )}
      </>
    );
  }
}

export default MyMap;
