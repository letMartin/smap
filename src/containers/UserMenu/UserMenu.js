import React, { Component } from "react";
import propTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./UserMenu.scss";
import ProfileViewer from "../../components/ProfileViewer/ProfileViewer";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
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
    isNewPostcards: propTypes.bool,
    isReceivedPostcards: propTypes.bool,
    getPostcardsStatistics: propTypes.func,
    switchUserEditorAction: propTypes.func,
    switchPassEditorAction: propTypes.func,
    allPostcardsSwitchAction: propTypes.func,
    newPostcardsSwitchAction: propTypes.func,
    receivedPostcardsSwitchAction: propTypes.func,
    postcards: propTypes.array,
    user: propTypes.object,
    userStatistics: propTypes.object,
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
    this.props.getPostcardsStatistics();
    this.setState({ isProfileOpen: isOpen });
  }

  handlePostcardsStatus(isReceived) {
    this.props.receivedPostcardsSwitchAction(isReceived);
    if (!isReceived) {
      this.props.newPostcardsSwitchAction(false);
    }
  }

  render() {
    const {
      isAllPostcards,
      isNewPostcards,
      userStatistics,
      isReceivedPostcards,
      allPostcardsSwitchAction,
      newPostcardsSwitchAction,
    } = this.props;
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
            PaperProps={{ style: { width: "250px" } }}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <div className="user-menu__switches">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Received</Grid>
                <Grid item>
                  <Switch
                    checked={!isReceivedPostcards}
                    color="default"
                    onChange={() =>
                      this.handlePostcardsStatus(!isReceivedPostcards)
                    }
                    value={"checked"}
                  />
                </Grid>
                <Grid item>Sent</Grid>
              </Grid>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>All</Grid>
                <Grid item>
                  <Switch
                    checked={!isAllPostcards}
                    color="default"
                    onChange={() => allPostcardsSwitchAction(!isAllPostcards)}
                    value={"checked"}
                  />
                </Grid>
                <Grid item>
                  {isReceivedPostcards ? "From myself" : "To myself"}
                </Grid>
              </Grid>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>All</Grid>
                <Grid item>
                  <Switch
                    checked={isNewPostcards}
                    color="default"
                    onChange={() => newPostcardsSwitchAction(!isNewPostcards)}
                    value={"checked"}
                    disabled={!isReceivedPostcards}
                  />
                </Grid>
                <Grid item>Only new</Grid>
              </Grid>
            </div>
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
          userStatistics={userStatistics}
          postcards={this.props.postcards}
          onClose={(isOpen) => this.handleToggleProfile(isOpen)}
        />
      </>
    );
  }
}

export default UserMenu;
