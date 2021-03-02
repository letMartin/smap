import React, { Component } from "react";
import propTypes from "prop-types";
import "./Auth.scss";

import cloneDeep from "lodash/cloneDeep";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  emailRegExp,
  passRegExp,
  nameRegExp,
  genderRegExp,
} from "../../store/regex";

import { placeholders, errors } from "../../store/labels";

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
        placeholder: placeholders.email,
        errorText: errors.email,
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
        placeholder: placeholders.password,
        errorText: errors.password,
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
        placeholder: placeholders.name,
        errorText: errors.name,
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
        placeholder: placeholders.surname,
        errorText: errors.surname,
        regex: nameRegExp,
        value: "",
        isValid: false,
        isSubmitClicked: false,
        startAdornment: <PersonOutlinedIcon />,
        endAdornment: null,
      },
      {
        key: "Gender",
        type: "select",
        title: "Gender",
        value: "OTHER",
        regex: genderRegExp,
        isValid: true,
        startAdornment: <HowToRegOutlinedIcon />,
        endAdornment: null,
        options: ["MALE", "FEMALE", "OTHER"],
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
        placeholder: placeholders.email,
        errorText: errors.email,
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
        placeholder: placeholders.password,
        errorText: errors.password,
        regex: passRegExp,
        value: "",
        isValid: false,
        startAdornment: <VpnKeyOutlinedIcon />,
        endAdornment: <VisibilityOffOutlinedIcon />,
      },
    ],
  },
  resetPassword: {
    formKey: "resetPassword",
    isSubmitClicked: false,
    inpGroup: [
      {
        key: "email",
        type: "text",
        title: "Email",
        placeholder: placeholders.email,
        errorText: errors.email,
        regex: emailRegExp,
        value: "",
        isValid: false,
        startAdornment: <AlternateEmailIcon />,
        endAdornment: null,
      },
    ],
  },
  isLoginClicked: false,
  isResetPasswordOpen: false,
};

class Auth extends Component {
  state = cloneDeep(initState);

  static propTypes = {
    authUser: propTypes.func,
    registerUser: propTypes.func,
    resetPassword: propTypes.func,
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
        gender: inputs[4].value,
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

  handleOpenPasswordReset (isOpen) {
    this.setState({ isResetPasswordOpen: isOpen })
  }

  handleResetPassword () {
    const form = { ...this.state.resetPassword };

    form.isSubmitClicked = true;
    this.setState({ resetPassword: form });

    if (!this.isFormValid(form.inpGroup)) {
      return;
    } else {
      const email = { email: form.inpGroup[0].value } 
      this.props.resetPassword(email)
    }
  }

  render() {
    const { authUser, registerUser, resetPassword } = this.state;
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
            disabled={isMainLoaderOn}
            onClick={() => this.handleOpenPasswordReset(true)}
          >
            Reset password
          </Button>
          <ButtonGroup>
          <Button
            onClick={() => this.handleToggleUserModal(true)}
            disabled={isMainLoaderOn}
          >
            New user
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isMainLoaderOn}
            onClick={() => this.handleUserAuth()}
          >
            Log in
          </Button>
          </ButtonGroup>
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
        <Dialog open={this.state.isResetPasswordOpen}>
          <div className="auth__reset">
            <form>
              {resetPassword.inpGroup.map((inp, index) => (
                <TextInput
                  input={inp}
                  key={inp.key + index}
                  index={index}
                  disabled={isMainLoaderOn}
                  inpGroup={resetPassword.formKey}
                  isSubmitClicked={resetPassword.isSubmitClicked}
                  onTogglePassVisibility={this.togglePassVisibility}
                  onInpChange={this.handleInputChange}
                />
              ))}
            </form>
            <div className="auth__buttons">
              <Button
                onClick={() => this.handleOpenPasswordReset(false)}
                disabled={isMainLoaderOn}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isMainLoaderOn}
                onClick={() => this.handleResetPassword()}
              >
                Reset
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
