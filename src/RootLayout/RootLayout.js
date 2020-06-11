import React, { Component } from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

import Auth from "../containers/Auth";
import MyMap from "../containers/MyMap";
import PostcardCreator from "../containers/PostcardCreator";
import UserMenu from "../containers/UserMenu";
import UserEditor from "../containers/UserEditor";

import "./RootLayout.scss";

class RootLayout extends Component {
  static propTypes = {
    prop: PropTypes.any,
    isModalOpen: PropTypes.bool,
    isAuth: PropTypes.bool,
    isMainLoaderOn: PropTypes.bool,
    isUserEditModalOpen: PropTypes.bool,
  };

  render() {
    const { isAuth, isUserEditModalOpen } = this.props;

    return (
      <div className="root-layout__container">
        {isAuth ? (
          <div>
            <MyMap />
            <UserMenu />
            {isUserEditModalOpen && <UserEditor />}
            {this.props.isModalOpen && <PostcardCreator />}
          </div>
        ) : (
          <Auth />
        )}
        {this.props.isMainLoaderOn && (
          <div className="root-layout__loader">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default RootLayout;
