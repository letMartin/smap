import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

const ImageViewer = ({ imageData, onImageLoaded }) => {
  const { url, height, width } = imageData;
  const [contentHeight, setHeight] = useState(0);
  const [contentWidth, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight - 32);
    setWidth(ref.current.clientWidth - 32);
  }, []);

  let imgStyle = null;
  if (url && height && width) {
    let imgHeight = contentHeight;
    let imgWidth = contentWidth;

    imgStyle = {
      display: "block",
      margin: "0 auto",
      boxSizing: "border-box",
      borderRadius: "4px",
      boxShadow: "10px -10px 150px 25px rgba(0,0,0,0.7)",
      maxHeight: imgHeight,
      maxWidth: imgWidth,
    };
  }
  return (
    <div className="step-content__container" ref={ref}>
      {url && <img src={url} alt="" onLoad={onImageLoaded} style={imgStyle} />}
    </div>
  );
};

ImageViewer.propTypes = {
  onImageLoaded: propTypes.func,
  imageData: propTypes.object,
};

export default ImageViewer;
