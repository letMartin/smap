import React from "react";
import propTypes from "prop-types";
import './PostcardViewer.scss'
import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from "@material-ui/core/Dialog";

const dialogStyle = {
  width: 'auto',
  border: '1px solid red',
}

const PostcardViewer = ({ open, imgUrl, onImageReady, isLoaded }) => {
  return (
    <Dialog open={open} style={dialogStyle} className='postcard-viewer__container'>
      <img src={imgUrl} alt='' onLoad={onImageReady} />
      {!isLoaded && <CircularProgress />}
    </Dialog>
  )
}

PostcardViewer.propTypes = {
  open: propTypes.bool,
  imgUrl: propTypes.string,
  onImageReady: propTypes.func
}

export default PostcardViewer