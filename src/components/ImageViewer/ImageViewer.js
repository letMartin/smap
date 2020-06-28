import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

const ImageViewer = ({ imageData, onImageLoaded }) => {
  const { url } = imageData;
  const [contentHeight, setHeight] = useState(0);
  const [contentWidth, setWidth] = useState(0);
  const ref = useRef(null);
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  let imgStyle = null;

  useEffect(() => {
    setHeight(ref.current.clientHeight - 20);
    setWidth(ref.current.clientWidth - 20);
  }, []);

  if (url) {
    imgStyle = {
      display: "block",
      margin: "0 auto",
      boxSizing: "border-box",
      borderRadius: "4px",
      boxShadow: "10px -10px 150px 25px rgba(0,0,0,0.7)",
      maxHeight: contentHeight,
      maxWidth: contentWidth,
    };
  }
  return (
    <div
      className="step-content__container"
      ref={ref}
      style={containerStyle}
      onLoad={onImageLoaded}
    >
      <div>{url && <img src={url} alt="" style={imgStyle} />}</div>
    </div>
  );
};

ImageViewer.propTypes = {
  onImageLoaded: propTypes.func,
  imageData: propTypes.object,
};

export default ImageViewer;
