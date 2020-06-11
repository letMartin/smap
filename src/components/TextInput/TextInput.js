import React from "react";
import propTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  let generatedInput = null;
  if (input.endAdornment) {
    iconBtn = (
      <IconButton onClick={() => onTogglePassVisibility(index, inpGroup)}>
        {input.endAdornment}
      </IconButton>
    );
  }
  if (input.type === "select") {
    generatedInput = (
      <FormControl fullWidth style={{ margin: "10px 0" }}>
        <InputLabel htmlFor={input.key}>{input.title}</InputLabel>
        <Select
          value={input.value}
          onChange={(e) => onInpChange(e, inpGroup, index)}
          startAdornment={
            <InputAdornment position="start">
              {input.startAdornment}
            </InputAdornment>
          }
        >
          {input.options.map((opt) => (
            <MenuItem value={opt} key={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    generatedInput = (
      <FormControl fullWidth style={{ margin: "10px 0" }}>
        <InputLabel htmlFor={input.key}>{input.title}</InputLabel>
        <Input
          value={input.value}
          placeholder={input.placeholder}
          type={input.type}
          onChange={(e) => onInpChange(e, inpGroup, index)}
          disabled={disabled}
          autoFocus={index === 0}
          required
          fullWidth
          id={input.key}
          error={!input.isValid && isSubmitClicked}
          startAdornment={
            <InputAdornment position="start">
              {input.startAdornment}
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">{iconBtn}</InputAdornment>
          }
        />
      </FormControl>
    );
  }
  return generatedInput;
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
