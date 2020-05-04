import React, { Component } from "react";
import PropTypes from "prop-types";

import MyMap from "../containers/MyMap";
import PostcardCreator from "../containers/PostcardCreator";

import "./RootLayout.scss";

class RootLayout extends Component {
  static propTypes = {
    prop: PropTypes.any,
    isModalOpen: PropTypes.bool,
  };

  render() {
    return (
      <div className="root-layout__container">
        <MyMap />
        {this.props.isModalOpen && <PostcardCreator />}
      </div>
    );
  }
}

export default RootLayout;
