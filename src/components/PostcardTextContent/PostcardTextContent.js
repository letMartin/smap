import React from "react";
import propTypes from "prop-types";

import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import TitleOutlinedIcon from "@material-ui/icons/TitleOutlined";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const PostcardTextContent = ({
  onChange,
  text,
  title,
  users,
  receivers,
  maxReceivers,
  onMultiChange,
  isSubmitClicked,
  isLoaderOn,
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
  const titleError = isSubmitClicked && !title.isValid;

  return (
    <div className="step-content__container ">
      <form>
        <Autocomplete
          multiple
          id="tags-standard"
          disabled={isLoaderOn}
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
        <FormControl fullWidth style={{ margin: "10px 0" }} error={titleError}>
          <InputLabel htmlFor="postcard-title">Add title</InputLabel>
          <Input
            value={title.value}
            type="text"
            placeholder="Greetings from holiday"
            onChange={(e) => onChange(title.key, e.target.value)}
            required
            fullWidth
            disabled={isLoaderOn}
            id="postcard-title"
            startAdornment={
              <InputAdornment position="start">
                <TitleOutlinedIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" style={styles.colorGrey}>
                {title.maxLength - title.length}
              </InputAdornment>
            }
          />
          {titleError && (
            <FormHelperText id="postcard-title">
              {title.errorText}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          value={text.value}
          placeholder="Optional postcard content"
          onChange={(e) => onChange(text.key, e.target.value)}
          style={{ marginTop: "5px" }}
          disabled={isLoaderOn}
          id="input-with-icon-grid"
          fullWidth
          multiline
          rows={5}
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
      {isLoaderOn && (
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
  title: propTypes.object,
  users: propTypes.array,
  receivers: propTypes.array,
  isUploadStarted: propTypes.bool,
  isSubmitClicked: propTypes.bool,
  isMainLoaderOn: propTypes.bool,
  maxReceivers: propTypes.number,
};

export default PostcardTextContent;
