import React from "react";
import propTypes from "prop-types";

const ImageViewer = ({ imageData, onImageLoaded }) => {
  let imgStyle = null;
  if (imageData.url && imageData.height && imageData.width) {
    const height = imageData.height >= imageData.width ? "100%" : "auto";
    const width = imageData.width > imageData.height ? "100%" : "auto";
    imgStyle = {
      display: "block",
      boxSizing: "border-box",
      margin: "0 auto",
      borderRadius: "4px",
      boxShadow: "10px -10px 150px 25px rgba(0,0,0,0.7)",
      height,
      width,
    };
  }
  return (
    <div className="step-content__container">
      {imageData.url && (
        <img
          src={imageData.url}
          alt=""
          onLoad={onImageLoaded}
          style={imgStyle}
        />
      )}
    </div>
  );
};

ImageViewer.propTypes = {
  onImageLoaded: propTypes.func,
  imageData: propTypes.object,
};

export default ImageViewer;
