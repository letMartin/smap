import React, { Component } from "react";
import PropTypes from "prop-types";

import MyMap from "../containers/MyMap";

import "./RootLayout.scss";

class RootLayout extends Component {
  static propTypes = {
    prop: PropTypes.any,
  };

  render() {
    return (
      <div className="root-layout__container">
        <MyMap />
      </div>
    );
  }
}

export default RootLayout;
