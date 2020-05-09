import React, { Component } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
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
      { name: "location", label: "Get location" },
      { name: "image", label: "Add image" },
      { name: "text", label: "Add text" },
    ],
  };

  static propTypes = {
    deviceLocation: propTypes.array,
    switchModalAction: propTypes.func,
    getPostcards: propTypes.func,
  };

  // handleFileInputChange(e) {
  //   const image = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onloadend = () => {
  //     this.setState({
  //       imageData: {
  //         ...this.state.imageData,
  //         url: reader.result,
  //         image,
  //       },
  //     });
  //   };
  // }

  // formatBytes(bytes, decimals = 2) {
  //   if (bytes === 0) return "0 Bytes";

  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));

  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }

  handleFileInputChange(e) {
    const image = e.target.files[0];
    if (image && image.size) {
      console.log(image.size / 1024);
    }
    if (image) {
      Resizer.imageFileResizer(
        image,
        700,
        700,
        "JPEG",
        100,
        0,
        (blob) => this.handleNewImgFile(blob),
        "blob"
      );
    }
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
    console.log("H: ", e.target.height);
    console.log("W: ", e.target.width);
    console.log("H natural: ", e.target.naturalHeight);
    console.log("W natural: ", e.target.naturalWidth);
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
        length: value.length,
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
    const { image } = this.state.imageData;
    const { senderName, postcardText } = this.state;
    const filename = `postcard-${Date.now()}`;
    const storageRef = firebase.storage().ref("/smap-images/" + filename);
    const uploadTask = storageRef.put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
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
            url: downloadURL,
            date,
          };
          update["/postcards/" + postcardKey] = postcard;
          firebase
            .database()
            .ref()
            .update(update)
            .then(() => this.props.getPostcards());
        });
      }
    );
  }

  render() {
    const { activeStep, steps, imageData } = this.state;
    let isNextStepBlocked = true;
    console.log(this.state.imageData);
    if (activeStep === 0) {
      isNextStepBlocked = !this.props.deviceLocation.length;
    } else if (activeStep === 1) {
      isNextStepBlocked = !imageData.url;
    } else if (activeStep === 2) {
      isNextStepBlocked = this.state.senderName.value.length < 3;
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
          <FileInput onChange={(e) => this.handleFileInputChange(e)} />
        )}
        {steps[activeStep].name === "text" && (
          <PostcardTextContent
            onChange={(stateName, value) =>
              this.onInputChange(stateName, value)
            }
            name={this.state.senderName}
            text={this.state.postcardText}
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
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
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
