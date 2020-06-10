import React, { Component } from "react";
import propTypes from "prop-types";
import Resizer from "react-image-file-resizer";

import Dialog from "@material-ui/core/Dialog";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ImageIcon from "@material-ui/icons/Image";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

import DeviceLocation from "../DeviceLocation";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import PostcardTextContent from "../../components/PostcardTextContent/PostcardTextContent";
import FileInput from "../../components/FileInput/Fileinput";

import { saveImage } from "../../store/actions/postcards";

import "./PostcardCreator.scss";

const clearBthStyle = {
  position: "absolute",
  top: "0",
  right: "0",
  zIndex: "10",
};

const icons = {
  0: <LocationOnIcon />,
  1: <ImageIcon />,
  2: <CreateIcon />,
};

class PostcardCreator extends Component {
  state = {
    imageData: {
      image: null,
      url: null,
      height: 0,
      width: 0,
    },
    senderName: {
      key: "senderName",
      value: "",
    },
    postcardText: {
      key: "postcardText",
      value: "",
      length: 0,
      maxLength: 250,
    },
    activeStep: 0,
    steps: [
      { name: "location", label: "Location" },
      { name: "image", label: "Image" },
      { name: "text", label: "Text" },
    ],
    imageError: "",
    isUploadStarted: false,
    users: [],
    receivers: [],
    maxReceivers: 10,
  };

  static propTypes = {
    deviceLocation: propTypes.array,
    usersList: propTypes.array,
    switchModalAction: propTypes.func,
    getPostcards: propTypes.func,
    sendPostcard: propTypes.func,
    getUsers: propTypes.func,
    user: propTypes.object,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    const { usersList } = this.props;
    if (prevProps.usersList.length < usersList.length && usersList.length > 0) {
      const users = usersList.map((user) => {
        return {
          title: `${user.name} ${user.surname}`,
          id: user.userId,
        };
      });

      this.setState({ users });
    }
  }

  handleFileInputChange(e) {
    const image = e.target.files[0];
    const size = this.getImageSize(image);
    if (size > 10000) {
      this.setState({ imageError: "Can't upload images larger than 10 MB" });
      return;
    }
    if (image) {
      Resizer.imageFileResizer(
        image,
        600,
        600,
        "JPEG",
        100,
        0,
        (blob) => this.handleNewImgFile(blob),
        "blob"
      );
    }
  }

  getImageSize(image) {
    const size = image && image.size ? image.size / 1024 : null;
    return size;
  }

  handleNewImgFile(blob) {
    const filename = `postcard-${Date.now()}.jpeg`;
    const image = new File([blob], filename, { type: "image/jpeg" });
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      this.setState({
        imageData: {
          ...this.state.imageData,
          url: reader.result,
          image,
        },
      });
    };
  }

  handleImageClear() {
    const imageData = {
      image: null,
      url: null,
      height: 0,
      width: 0,
    };
    this.setState({ imageData });
  }

  onInputChange(stateName, value) {
    if (value.length > this.state[stateName].maxLength) {
      return;
    }
    this.setState({
      [stateName]: {
        ...this.state[stateName],
        length: value.trim().length,
        value,
      },
    });
  }

  handleMultiChange(e, val) {
    this.setState({ receivers: val });
  }

  handleNext = () => {
    if (this.state.activeStep === this.state.steps.length - 1) {
      this.submitPostcard();
    } else {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  submitPostcard = () => {
    const { imageData, postcardText, receivers } = this.state;
    const { user, deviceLocation, sendPostcard } = this.props;

    saveImage(imageData.image).then((res) => {
      const { fileId } = res.data;
      const postcard = {
        fileId,
        content: postcardText.value,
        senderId: user.userId,
        receiverId: receivers[0].id,
        localization: deviceLocation,
      };

      sendPostcard(postcard);
    });
  };

  render() {
    const {
      activeStep,
      steps,
      imageData,
      imageError,
      postcardText,
      isUploadStarted,
    } = this.state;
    let isNextStepBlocked = true;
    if (activeStep === 0) {
      isNextStepBlocked = !this.props.deviceLocation.length;
    } else if (activeStep === 1) {
      isNextStepBlocked = !imageData.url;
    } else if (activeStep === 2) {
      isNextStepBlocked = this.state.senderName.length < 3;
    }
    return (
      <Dialog open={true}>
        {steps[activeStep].name === "location" && <DeviceLocation />}
        {steps[activeStep].name === "image" && imageData.url && (
          <>
            <IconButton
              style={clearBthStyle}
              onClick={() => this.handleImageClear()}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ClearOutlinedIcon color="error" />
            </IconButton>
            <ImageViewer
              imageData={imageData}
              onImageClear={() => this.handleImageClear()}
            />
          </>
        )}
        {steps[activeStep].name === "image" && !imageData.url && (
          <FileInput
            onChange={(e) => this.handleFileInputChange(e)}
            error={imageError}
          />
        )}
        {steps[activeStep].name === "text" && (
          <PostcardTextContent
            onChange={(stateName, value) =>
              this.onInputChange(stateName, value)
            }
            onMultiChange={(e, val) => this.handleMultiChange(e, val)}
            users={this.state.users}
            receivers={this.state.receivers}
            maxReceivers={this.state.maxReceivers}
            text={postcardText}
            isUploadStarted={isUploadStarted}
          />
        )}
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step.name}>
              <StepLabel StepIconComponent={icons.index}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep < steps.length && (
            <div className="postcard-creator-buttons__container">
              <Button onClick={() => this.props.switchModalAction(false)}>
                Reset
              </Button>
              <ButtonGroup>
                <Button disabled={activeStep === 0} onClick={this.handleBack}>
                  Back
                </Button>
                <Button
                  disabled={isNextStepBlocked}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? "Send" : "Next"}
                </Button>
              </ButtonGroup>
            </div>
          )}
        </div>
      </Dialog>
    );
  }
}

export default PostcardCreator;
