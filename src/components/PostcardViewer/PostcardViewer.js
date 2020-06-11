import React from "react";
import propTypes from "prop-types";
import moment from "moment";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";

import "./PostcardViewer.scss";

const PostcardViewer = ({
  open,
  postcard,
  onImageReady,
  onClose,
  isLoaded,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="postcard-viewer__container"
    >
      <div>
        <img
          src="https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          alt=""
          onLoad={onImageReady}
        />
      </div>
      {!isLoaded && (
        <div className="postcard-viewer__progress">
          <CircularProgress />
        </div>
      )}
      <div className="postcard-viewer__text">
        <p className="postcard-viewer__text--header">
          {`From ${postcard.sender.userId} on ${moment(
            postcard.updatedAt
          ).format("DD MMMM YYYY")}`}
        </p>
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
