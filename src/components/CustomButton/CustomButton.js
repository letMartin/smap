import React from 'react';
import Button from '@material-ui/core/Button';

const CustomButton = ({ content, onButtonClick }) => {
  return (
      <Button onClick={onButtonClick} variant="contained" color="primary" style={{ zIndex: 999 }}>
        {content}
      </Button>
  );
}

export default CustomButton