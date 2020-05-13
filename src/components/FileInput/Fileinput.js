import React from "react";
import propTypes from "prop-types";

import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

import "./FileInput.scss";

const FileInput = ({ onChange, error }) => {
  return (
    <div className="step-content__container">
      <div className="file-input__container">
        <h2 className="file-input__title">Add picture</h2>
        <label htmlFor="file-input">
          <AddPhotoAlternateOutlinedIcon style={{ cursor: "pointer" }} />
        </label>
        <p className="file-input__info">Max 10 MB</p>
        <input type="file" onChange={onChange} id="file-input" />
        {error !== "" && <p className="file-input__error">{error}</p>}
      </div>
    </div>
  );
};

FileInput.propTypes = {
  onChange: propTypes.func,
  error: propTypes.string,
};

export default FileInput;
