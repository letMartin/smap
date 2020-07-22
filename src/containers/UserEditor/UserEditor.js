import React, { Component } from "react";
import propTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";

import "./UserEditor.scss";
import { placeholders, errors } from "../../store/labels";
import { nameRegExp, genderRegExp } from "../../store/regex";
import TextInput from "../../components/TextInput/TextInput";

class UserEditor extends Component {
  state = {
    editUser: {
      formKey: "editUser",
      isSubmitClicked: false,
      inpGroup: [
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
          key: "surname",
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
          key: "gender",
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
  };

  static propTypes = {
    isMainLoaderOn: propTypes.bool,
    isSubmitClicked: propTypes.bool,
    isUserEditModalOpen: propTypes.bool,
    user: propTypes.object,
    inpGroup: propTypes.array,
    updateUser: propTypes.func,
    switchUserEditorAction: propTypes.func,
  };

  componentDidMount() {
    const { name, surname, gender } = this.props.user;
    const { inpGroup } = this.state.editUser;
    const updatedInpGroup = inpGroup.map((inp) => {
      const updatedInp = { ...inp };
      if (inp.key === "name") {
        updatedInp.value = name;
      } else if (inp.key === "surname") {
        updatedInp.value = surname;
      } else if (inp.key === "gender") {
        updatedInp.value = gender;
      }
      updatedInp.isValid = true;
      return updatedInp;
    });
    const editUser = { ...this.state.editUser };
    editUser.inpGroup = updatedInpGroup;
    this.setState({ editUser });
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

  handleUserRegister() {
    const form = { ...this.state.editUser };

    form.isSubmitClicked = true;
    this.setState({ editUser: form });

    if (!this.isFormValid(form.inpGroup)) {
      return;
    } else {
      const inputs = this.state.editUser.inpGroup;
      const user = {
        name: inputs[0].value,
        surname: inputs[1].value,
        gender: inputs[2].value,
      };
      this.props.updateUser(user);
    }
  }

  isFormValid(form) {
    let isValid = true;

    form.forEach((inp) => {
      isValid = isValid && inp.isValid;
    });
    return isValid;
  }

  render() {
    const { editUser } = this.state;
    const { isMainLoaderOn, isUserEditModalOpen } = this.props;
    return (
      <Dialog open={isUserEditModalOpen}>
        <div className="edit-user__container">
          <form>
            {editUser.inpGroup.map((inp, index) => (
              <TextInput
                input={inp}
                key={inp.key}
                index={index}
                disabled={this.props.isMainLoaderOn}
                inpGroup={editUser.formKey}
                isSubmitClicked={editUser.isSubmitClicked}
                onInpChange={this.handleInputChange}
              />
            ))}
          </form>
          <div className="edit-user__buttons">
            <Button
              onClick={() => this.props.switchUserEditorAction(false)}
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
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserEditor;
