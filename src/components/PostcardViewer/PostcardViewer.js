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
  const { width, height } = postcard.image;
  let imgWidth = width;
  let imgHeight = height;
  if (isLoaded) {
    imgWidth = "100%";
    imgHeight = "100%";
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="postcard-viewer__container"
    >
      <div style={{ width: imgWidth, height: imgHeight }}>
        <img src={postcard.image.url} alt="" onLoad={onImageReady} />
      </div>
      {!isLoaded && (
        <div style={{ height, width }} className="postcard-viewer__progress">
          <CircularProgress />
        </div>
      )}
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
