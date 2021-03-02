import React, { Component } from "react";
import propTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import "./PassEditor.scss";
import { placeholders, errors } from "../../store/labels";
import { passRegExp } from "../../store/regex";
import TextInput from "../../components/TextInput/TextInput";

const initState = {
  editPass: {
    formKey: "editPass",
    isSubmitClicked: false,
    inpGroup: [
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
    ],
  },
};

class PassEditor extends Component {
  state = cloneDeep(initState);

  static propTypes = {
    isMainLoaderOn: propTypes.bool,
    isSubmitClicked: propTypes.bool,
    isPassEditModalOpen: propTypes.bool,
    switchPassEditorAction: propTypes.func,
  };

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

  handleChangePass() {
    const form = { ...this.state.editPass };

    form.isSubmitClicked = true;
    this.setState({ editPass: form });

    if (!this.isFormValid(form.inpGroup)) {
      return;
    } else {
      console.log("Updating user ... ");
    }
  }

  isFormValid(form) {
    let isValid = true;

    form.forEach((inp) => {
      isValid = isValid && inp.isValid;
    });
    return isValid;
  }

  handleClosePassEditor() {
    this.setState(cloneDeep(initState));
    this.props.switchPassEditorAction(false);
  }

  render() {
    const { editPass } = this.state;
    const { isMainLoaderOn, isPassEditModalOpen } = this.props;
    return (
      <Dialog open={isPassEditModalOpen} fullWidth maxWidth="xs">
        <div className="edit-pass__container">
          <form>
            {editPass.inpGroup.map((inp, index) => (
              <TextInput
                input={inp}
                key={inp.key}
                index={index}
                disabled={this.props.isMainLoaderOn}
                inpGroup={editPass.formKey}
                isSubmitClicked={editPass.isSubmitClicked}
                onInpChange={this.handleInputChange}
                onTogglePassVisibility={this.togglePassVisibility}
              />
            ))}
          </form>
          <div className="edit-pass__buttons">
            <Button
              onClick={() => this.handleClosePassEditor()}
              disabled={isMainLoaderOn}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isMainLoaderOn}
              onClick={() => this.handleChangePass()}
            >
              Change
            </Button>
            {isMainLoaderOn && (
              <div className="edit-pass--loader">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PassEditor;
