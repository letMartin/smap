import React from "react";
import propTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const PostcardTextContent = ({
  onChange,
  text,
  name,
  progress,
  isUploadStarted,
}) => {
  const styles = {
    colorGrey: {
      color: "#ccc",
    },
  };
  return (
    <div className="step-content__container ">
      <form autoComplete="off">
        <FormControl fullWidth style={{ marginTop: "24px" }}>
          <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
          <Input
            value={name.value}
            placeholder="Your name"
            onChange={(e) => onChange(name.key, e.target.value)}
            autoFocus
            required
            fullWidth
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlinedIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" style={styles.colorGrey}>
                {name.maxLength - name.length}
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          value={text.value}
          placeholder="You can drop me a line, but it's optional"
          onChange={(e) => onChange(text.key, e.target.value)}
          style={{ marginTop: "16px" }}
          id="input-with-icon-grid"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreateOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" style={styles.colorGrey}>
                {text.maxLength - text.length}
              </InputAdornment>
            ),
          }}
        />
      </form>
      {isUploadStarted && (
        <div className="progress__container">
          <p className="progress__percent">{progress.toFixed()} %</p>
          <CircularProgress />
          {progress === 100 && <p>Saving postcard...</p>}
        </div>
      )}
    </div>
  );
};

PostcardTextContent.propTypes = {
  onChange: propTypes.func,
  text: propTypes.object,
  name: propTypes.object,
  progress: propTypes.number,
  isUploadStarted: propTypes.bool,
};

export default PostcardTextContent;