import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./PostcardViewer.scss";

const PostcardViewer = ({
  postcard,
  postcardSide,
  onPostcardClick,
  onImgLoaded,
  image,
}) => {
  const { fileHeight, fileWidth } = postcard;

  let imgSrc = null;

  if (image && image.fileId === postcard.file.fileId) {
    imgSrc = `data:image/jpg;base64, ${Buffer.from(image.data.data).toString(
      "base64"
    )}`;
  }

  const style = {
    transform: postcardSide === "back" ? "rotateY(180deg)" : "none",
  };

  return (
    <div className="postcard-backdrop" onClick={onPostcardClick}>
      <div className="postcard-wrapper">
        <div className="postcard-container" style={style}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt=""
              className="postcard-image"
              onLoad={() => onImgLoaded(postcard)}
            />
          ) : (
            <div className="image-placeholder">
              <canvas
                width={fileWidth}
                height={fileHeight}
                className="postcard-image"
              />
              <div className="image-loader">
                <LinearProgress />
              </div>
            </div>
          )}
          <div className="postcard-back">
            <div className="postcard-frame">
              <p className="postcard-title">{postcard.shortDescription}</p>
              {postcard.content !== "" && (
                <p className="postcard-content">{postcard.content}</p>
              )}
              <p className="postcard-info">
                {`${postcard.sender.userId} on
              ${moment(postcard.updatedAt).format("DD MMMM YYYY")}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostcardViewer.propTypes = {
  open: propTypes.bool,
  postcardSide: propTypes.string,
  postcard: propTypes.object,
  onPostcardClick: propTypes.func,
  onImgLoaded: propTypes.func,
};

export default PostcardViewer;
