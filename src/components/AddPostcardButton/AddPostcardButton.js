import React from "react";
import propTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { green } from "@material-ui/core/colors";

function AddPostcardButton({ onAddPostcardClick }) {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        onClick={onAddPostcardClick}
        style={{ zIndex: 999 }}
        color="primary"
        component="span"
      >
        <AddCircleTwoToneIcon fontSize="large" />
      </IconButton>
    </ThemeProvider>
  );
}

AddPostcardButton.propTypes = {
  onAddPostcardClick: propTypes.func,
};

export default AddPostcardButton;
