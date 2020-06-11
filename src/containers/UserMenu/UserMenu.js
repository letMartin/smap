import React, { Component } from "react";
import propTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./UserMenu.scss";

class UserMenu extends Component {
  state = {
    anchorEl: null,
  };

  static propTypes = {
    isMainLoaderOn: propTypes.bool,
    switchUserEditorAction: propTypes.func,
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
            <MenuItem onClick={this.handleClose}>My profile</MenuItem>
            <MenuItem onClick={() => this.props.switchUserEditorAction(true)}>
              Edit account
            </MenuItem>
            <MenuItem onClick={this.handleClose}>Change password</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </>
    );
  }
}

export default UserMenu;
