import React, { Component } from "react";
import propTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./UserMenu.scss";
import ProfileViewer from "../../components/ProfileViewer/ProfileViewer";

class UserMenu extends Component {
  state = {
    anchorEl: null,
    isProfileOpen: false,
  };

  static propTypes = {
    isMainLoaderOn: propTypes.bool,
    switchUserEditorAction: propTypes.func,
    user: propTypes.object,
  };

  handleClick = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout() {
    localStorage.removeItem("smapToken");
    localStorage.removeItem("smapUser");
    window.location.reload();
  }

  handleInputChange(e) {
    console.log(e.currentTarget.value);
  }

  handleToggleProfile(isOpen) {
    this.setState({ isProfileOpen: isOpen });
  }

  render() {
    return (
      <>
        <div className="user-menu__container">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="primary"
            onClick={this.handleClick}
          >
            My Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => this.handleToggleProfile(true)}>
              My profile
            </MenuItem>
            <MenuItem onClick={() => this.props.switchUserEditorAction(true)}>
              Edit account
            </MenuItem>
            <MenuItem onClick={this.handleClose}>Change password</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <ProfileViewer
          isOpen={this.state.isProfileOpen}
          user={this.props.user}
          onClose={(isOpen) => this.handleToggleProfile(isOpen)}
        />
      </>
    );
  }
}

export default UserMenu;
