import React from "react";
import propTypes from "prop-types";
import moment from "moment";

import "./ProfileViewer.scss";

// import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const ProfileViewer = ({
  isOpen,
  onClose,
  user,
  postcards,
  userStatistics,
}) => {
  const { name, surname, gender, email, createdAt, updatedAt } = user;
  const totalReceived = userStatistics
    ? userStatistics.totalReceived
    : "not available";
  const totalSent = userStatistics ? userStatistics.totalSent : "not available";
  const newReceived = userStatistics
    ? userStatistics.newReceived
    : "not available";
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth>
      <div className="profile-viewer__container">
        <Typography variant="h6" gutterBottom>
          {`${name} ${surname}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {gender.toLowerCase()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created at: {moment(createdAt).format("DD MMMM YYYY HH:MM")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Updated at: {moment(updatedAt).format("DD MMMM YYYY HH:MM")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Postcards received: {totalReceived} ({newReceived} new)
        </Typography>
        <Typography variant="body1" gutterBottom>
          Postcards sent: {totalSent}
        </Typography>
        <Button color="primary" onClick={() => onClose(false)} fullWidth>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

ProfileViewer.propTypes = {
  isOpen: propTypes.bool,
  onClose: propTypes.func,
  user: propTypes.object,
  userStatistics: propTypes.object,
  postcards: propTypes.array,
};

export default ProfileViewer;
