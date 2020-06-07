import React, { Component } from "react";
import propTypes from "prop-types";
import "./Auth.scss";

import { cloneDeep } from "lodash";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import { emailRegExp, passRegExp, nameRegExp } from "../../store/regex";

import TextInput from "../../components/TextInput/TextInput";

const initState = {
  registerUser: {
    formKey: "registerUser",
    isSubmitClicked: false,
    inpGroup: [
      {
        key: "email",
        type: "email",
        title: "Email",
        placeholder: "Enter your email address",
        regex: emailRegExp,
        value: "",
        isValid: false,
        isSubmitClicked: false,
        startAdornment: <AlternateEmailIcon />,
        endAdornment: "",
      },
      {
        key: "password",
        type: "password",
        title: "Password",
        placeholder: "Enter your password",
        regex: passRegExp,
        value: "",
        isValid: false,
        isSubmitClicked: false,
        startAdornment: <VpnKeyOutlinedIcon />,
        endAdornment: <VisibilityOffOutlinedIcon />,
      },
      {
        key: "name",
        type: "text",
        title: "Name",
        placeholder: "Enter your Name",
        regex: nameRegExp,
        value: "",
        isValid: false,
        isSubmitClicked: false,
        startAdornment: <PersonOutlinedIcon />,
        endAdornment: null,
      },
      {
        key: "Surname",
        type: "text",
        title: "Surname",
        placeholder: "Enter your surname",
        regex: nameRegExp,
        value: "",
        isValid: false,
        isSubmitClicked: false,
        startAdornment: <PersonOutlinedIcon />,
        endAdornment: null,
      },
    ],
  },
  authUser: {
    formKey: "authUser",
    isSubmitClicked: false,
    inpGroup: [
      {
        key: "email",
        type: "text",
        title: "Email",
        placeholder: "Enter your email address",
        regex: emailRegExp,
        value: "",
        isValid: false,
        startAdornment: <AlternateEmailIcon />,
        endAdornment: null,
      },
      {
        key: "password",
        type: "password",
        title: "Password",
        placeholder: "Enter your password",
        regex: passRegExp,
        value: "",
        isValid: false,
        startAdornment: <VpnKeyOutlinedIcon />,
        endAdornment: <VisibilityOffOutlinedIcon />,
      },
    ],
  },
  isLoginClicked: false,
};

class Auth extends Component {
  state = cloneDeep(initState);

  static propTypes = {
    authUser: propTypes.func,
    registerUser: propTypes.func,
    switchUserModalAction: propTypes.func,
    isUserModalOpen: propTypes.bool,
    isMainLoaderOn: propTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isUserModalOpen && !this.props.isUserModalOpen) {
      const registerUser = cloneDeep(initState.registerUser);
      this.setState({ registerUser });
    }
  }

  handleToggleUserModal(shouldOpen) {
    this.props.switchUserModalAction(shouldOpen);
  }

  handleInputChange = (e, inpKey, index) => {
    const form = { ...this.state[inpKey] };
    const input = { ...form.inpGroup[index] };
    const { value } = e.target;

    input.value = value;
    input.isValid = input.regex.test(value);
    form.inpGroup[index] = input;

    this.setState({
      [inpKey]: form,
    });
  };

  togglePassVisibility = (index, inpGroup) => {
    const input = { ...this.state[inpGroup].inpGroup };
    const passInp = input[index];

    if (passInp.type === "password") {
      passInp.type = "text";
      passInp.endAdornment = <VisibilityOutlinedIcon />;
    } else {
      passInp.type = "password";
      passInp.endAdornment = <VisibilityOffOutlinedIcon />;
    }
    this.setState({ input });
  };

  handleUserAuth() {
    const form = { ...this.state.authUser };

    form.isSubmitClicked = true;
    this.setState({ authUser: form });

    if (!this.isFormValid(form.inpGroup)) {
      return;
    } else {
      const inputs = this.state.authUser.inpGroup;
      const user = {
        email: inputs[0].value,
        password: inputs[1].value,
      };
      this.authUser(user);
    }
  }

  authUser(user) {
    this.props.authUser(user);
  }

  handleUserRegister() {
    const form = { ...this.state.registerUser };

    form.isSubmitClicked = true;
    this.setState({ registerUser: form });

    if (!this.isFormValid(form.inpGroup)) {
      return;
    } else {
      const inputs = this.state.registerUser.inpGroup;
      const user = {
        email: inputs[0].value,
        password: inputs[1].value,
        name: inputs[2].value,
        surname: inputs[3].value,
        gender: "MALE",
      };
      this.createUser(user);
    }
  }

  createUser(user) {
    this.props.registerUser(user);
  }

  isFormValid(form) {
    let isValid = true;

    form.forEach((inp) => {
      isValid = isValid && inp.isValid;
    });
    return isValid;
  }

  render() {
    const { authUser, registerUser } = this.state;
    const { isMainLoaderOn } = this.props;
    return (
      <div className="auth__container">
        <form autoComplete="off">
          {authUser.inpGroup.map((inp, index) => (
            <TextInput
              input={inp}
              key={inp.key}
              inpGroup={authUser.formKey}
              index={index}
              disabled={isMainLoaderOn}
              isSubmitClicked={authUser.isSubmitClicked}
              onTogglePassVisibility={this.togglePassVisibility}
              onInpChange={this.handleInputChange}
            />
          ))}
        </form>
        <div className="auth__buttons">
          <Button
            onClick={() => this.handleToggleUserModal(true)}
            disabled={isMainLoaderOn}
          >
            Create new user
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isMainLoaderOn}
            onClick={() => this.handleUserAuth()}
          >
            Log in
          </Button>
        </div>
        <Dialog open={this.props.isUserModalOpen}>
          <div className="auth__new-user">
            <form>
              {registerUser.inpGroup.map((inp, index) => (
                <TextInput
                  input={inp}
                  key={inp.key + index}
                  index={index}
                  disabled={isMainLoaderOn}
                  inpGroup={registerUser.formKey}
                  isSubmitClicked={registerUser.isSubmitClicked}
                  onTogglePassVisibility={this.togglePassVisibility}
                  onInpChange={this.handleInputChange}
                />
              ))}
            </form>
            <div className="auth__buttons">
              <Button
                onClick={() => this.handleToggleUserModal(false)}
                disabled={isMainLoaderOn}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isMainLoaderOn}
                onClick={() => this.handleUserRegister()}
              >
                Save
              </Button>
              {isMainLoaderOn && (
                <div className="auth__new-user--loader">
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Auth;
