import React from "react";
import propTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const TextInput = ({
  input,
  index,
  inpGroup,
  disabled,
  isSubmitClicked,
  onInpChange,
  onTogglePassVisibility,
}) => {
  let iconBtn = "";
  if (input.endAdornment) {
    iconBtn = (
      <IconButton onClick={() => onTogglePassVisibility(index, inpGroup)}>
        {input.endAdornment}
      </IconButton>
    );
  }
  return (
    <FormControl fullWidth style={{ margin: "10px 0" }}>
      <InputLabel htmlFor={input.key}>{input.title}</InputLabel>
      <Input
        value={input.value}
        placeholder={input.placeholder}
        type={input.type}
        onChange={(e) => onInpChange(e, inpGroup, index)}
        disabled={disabled}
        autoFocus
        required
        fullWidth
        id={input.key}
        error={!input.isValid && isSubmitClicked}
        startAdornment={
          <InputAdornment position="start">
            {input.startAdornment}
          </InputAdornment>
        }
        endAdornment={<InputAdornment position="end">{iconBtn}</InputAdornment>}
      />
    </FormControl>
  );
};

TextInput.propTypes = {
  input: propTypes.object,
  index: propTypes.number,
  inpGroup: propTypes.string,
  disabled: propTypes.bool,
  isSubmitClicked: propTypes.bool,
  onInpChange: propTypes.func,
  onTogglePassVisibility: propTypes.func,
};

export default TextInput;
