import React from "react";
import propTypes from "prop-types";

import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

import "./FileInput.scss";

const FileInput = ({ onChange }) => {
  return (
    <div className="step-content__container">
      <div className="file-input__container">
        <h2>Add picture</h2>
        <label htmlFor="file-input">
          <AddPhotoAlternateOutlinedIcon style={{ cursor: "pointer" }} />
        </label>
        <input type="file" onChange={onChange} id="file-input" />
      </div>
    </div>
  );
};

FileInput.propTypes = {
  onChange: propTypes.func,
};

export default FileInput;
