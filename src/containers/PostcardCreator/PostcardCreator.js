import React, { Component } from "react";
import propTypes from "prop-types";

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
      height: 190,
      width: 400,
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
  };

  handleFileInputChange(e) {
    const image = e.target.files[0];
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
    console.log("Submitting");
  }

  render() {
    const { activeStep, steps, imageData } = this.state;
    let isNextStepBlocked = true;
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
              <Button>Reset</Button>
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
