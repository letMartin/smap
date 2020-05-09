import React from "react";
import propTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

function AddPostcardButton({ onAddPostcardClick }) {
  return (
    <IconButton
      onClick={onAddPostcardClick}
      style={{ zIndex: 999 }}
      color="primary"
      component="span"
    >
      <AddCircleTwoToneIcon fontSize="large" />
    </IconButton>
  );
}

AddPostcardButton.propTypes = {
  onAddPostcardClick: propTypes.func,
};

export default AddPostcardButton;
