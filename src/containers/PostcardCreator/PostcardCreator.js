import React, { Component } from "react";
import propTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import Resizer from "react-image-file-resizer";

import DeviceLocation from "../DeviceLocation";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import PostcardTextContent from "../../components/PostcardTextContent/PostcardTextContent";
import FileInput from "../../components/FileInput/Fileinput";

import Dialog from "@material-ui/core/Dialog";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ImageIcon from "@material-ui/icons/Image";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "./PostcardCreator.scss";

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
      length: 0,
      maxLength: 20,
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
    progress: 0,
    isUploadStarted: false,
  };

  static propTypes = {
    deviceLocation: propTypes.array,
    switchModalAction: propTypes.func,
    getPostcards: propTypes.func,
  };

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
    const filename = `postcard-${Date.now()}`;
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

  handleImageLoaded(e) {
    const imageData = { ...this.state.imageData };
    imageData.height = e.target.height;
    imageData.width = e.target.width;
    console.log(imageData);
    this.setState({
      imageData,
    });
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

  handleNext = () => {
    if (this.state.activeStep === this.state.steps.length - 1) {
      this.handleSubmitPostcard();
    } else {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleSubmitPostcard() {
    this.setState({ isUploadStarted: true });
    const { image, width, height } = this.state.imageData;
    const { senderName, postcardText } = this.state;
    const filename = `postcard-${Date.now()}`;
    const storageRef = firebase.storage().ref("/smap-images/" + filename);
    const uploadTask = storageRef.put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress });
      },
      (error) => {
        console.log(error);
        this.setState({ isUploadStarted: false });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const postcardKey = firebase.database().ref("postcards/").push().key;
          const date = new Date().toISOString().substring(0, 10);
          const update = {};
          const postcard = {
            sender: senderName.value,
            content: postcardText.value,
            location: this.props.deviceLocation,
            image: {
              url: downloadURL,
              width,
              height,
            },
            date,
          };
          update["/postcards/" + postcardKey] = postcard;
          firebase
            .database()
            .ref()
            .update(update)
            .then(() => {
              this.setState(
                {
                  isUploadStarted: false,
                  progress: 0,
                },
                () => {
                  this.props.switchModalAction(false);
                  this.props.getPostcards();
                }
              );
            });
        });
      }
    );
  }

  render() {
    const {
      activeStep,
      steps,
      imageData,
      imageError,
      progress,
      senderName,
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
          <ImageViewer
            imageData={imageData}
            onImageLoaded={(e) => this.handleImageLoaded(e)}
          />
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
            name={senderName}
            text={postcardText}
            progress={progress}
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
