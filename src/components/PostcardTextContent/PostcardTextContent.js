import React from "react";
import propTypes from "prop-types";

import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const PostcardTextContent = ({
  onChange,
  text,
  users,
  receivers,
  maxReceivers,
  onMultiChange,
  isUploadStarted,
  isSubmitClicked,
}) => {
  const styles = {
    colorGrey: {
      color: "#ccc",
    },
  };
  const leftToAdd = maxReceivers - receivers.length;
  const placeholder =
    leftToAdd < maxReceivers
      ? String(leftToAdd)
      : `Max ${maxReceivers} receivers`;
  const userNames = receivers.length >= maxReceivers ? [] : users;

  return (
    <div className="step-content__container ">
      <form>
        <Autocomplete
          multiple
          id="tags-standard"
          options={userNames}
          onChange={onMultiChange}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              error={isSubmitClicked && !receivers.length}
              disabled={receivers.length >= 2}
              variant="standard"
              label="Select receivers"
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <AlternateEmailOutlinedIcon />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
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
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

PostcardTextContent.propTypes = {
  onChange: propTypes.func,
  text: propTypes.object,
  users: propTypes.array,
  receivers: propTypes.array,
  isUploadStarted: propTypes.bool,
  isSubmitClicked: propTypes.bool,
  maxReceivers: propTypes.number,
};

export default PostcardTextContent;
