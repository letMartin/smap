import React, { Component } from "react";
import propTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./UserMenu.scss";
import ProfileViewer from "../../components/ProfileViewer/ProfileViewer";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

class UserMenu extends Component {
  state = {
    anchorEl: null,
    isProfileOpen: false,
  };

  static propTypes = {
    isMainLoaderOn: propTypes.bool,
    isAllPostcards: propTypes.bool,
    isReceivedPostcards: propTypes.bool,
    switchUserEditorAction: propTypes.func,
    switchPassEditorAction: propTypes.func,
    allPostcardsSwitchAction: propTypes.func,
    receivedPostcardsSwitchAction: propTypes.func,
    postcards: propTypes.array,
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

  handleToggleProfile(isOpen) {
    this.setState({ isProfileOpen: isOpen });
  }

  render() {
    const { isAllPostcards, isReceivedPostcards } = this.props;

    return (
      <>
        <div className="user-menu__container">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="default"
            variant="contained"
            onClick={this.handleClick}
          >
            <SettingsOutlinedIcon fontSize="large" color="primary" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            PaperProps={{ style: { width: "200px" } }}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  style={{ padding: "0 12px" }}
                  value="top"
                  control={
                    <Switch
                      color="primary"
                      checked={isReceivedPostcards}
                      onChange={() =>
                        this.props.receivedPostcardsSwitchAction(
                          !isReceivedPostcards
                        )
                      }
                    />
                  }
                  label={isReceivedPostcards ? "Received" : "Sent"}
                  labelPlacement="end"
                />
              </FormGroup>
              <FormControlLabel
                style={{ padding: "0 12px" }}
                value="top"
                control={
                  <Switch
                    color="primary"
                    checked={isAllPostcards}
                    onChange={() =>
                      this.props.allPostcardsSwitchAction(!isAllPostcards)
                    }
                  />
                }
                label={
                  isAllPostcards
                    ? "All"
                    : isReceivedPostcards
                    ? "From myself"
                    : "To myself"
                }
                labelPlacement="end"
              />
            </FormControl>
            <MenuItem onClick={() => this.handleToggleProfile(true)}>
              My profile
            </MenuItem>
            <MenuItem onClick={() => this.props.switchUserEditorAction(true)}>
              Edit account
            </MenuItem>
            <MenuItem onClick={() => this.props.switchPassEditorAction(true)}>
              Change password
            </MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <ProfileViewer
          isOpen={this.state.isProfileOpen}
          user={this.props.user}
          postcards={this.props.postcards}
          onClose={(isOpen) => this.handleToggleProfile(isOpen)}
        />
      </>
    );
  }
}

export default UserMenu;
