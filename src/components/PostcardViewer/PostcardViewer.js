import React from "react";
import propTypes from "prop-types";
import "./PostcardViewer.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from "@material-ui/core/Dialog";

const PostcardViewer = ({
  open,
  postcard,
  onImageReady,
  onClose,
  isLoaded,
}) => {
  const random = getRandomInt(1, 5);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const url = `images/img${random}.jpg`;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="postcard-viewer__container"
    >
      <img src={url} alt="" onLoad={onImageReady} />
      {!isLoaded && <CircularProgress />}
      <div className="postcard-viewer__text">
        <p className="postcard-viewer__text--header">{`Received from ${postcard.sender} on ${postcard.date}`}</p>
        {postcard.content !== "" && (
          <p className="postcard-viewer__text--content">{postcard.content}</p>
        )}
      </div>
    </Dialog>
  );
};

PostcardViewer.propTypes = {
  open: propTypes.bool,
  postcard: propTypes.object,
  onImageReady: propTypes.func,
  onClose: propTypes.func,
};

export default PostcardViewer;
