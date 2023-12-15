import img1 from "../../assets/login--1.svg";
import img2 from "../../assets/login--2.svg";
import img3 from "../../assets/login--3.svg";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "鼓舞人心的故事",
    desc: "從非凡的人生故事和成功經歷中獲得靈感",
    backgroundColor: "#23262F",
    imgPath: img1,
  },
  {
    label: "輕鬆分類與管理",
    desc: "一目了然的分類，讓蒐藏的Podcast保持整潔",
    backgroundColor: "#2D3831",
    imgPath: img2,
  },
  {
    label: "Spotify 快速同步",
    desc: "透過 Spotify 登入，即刻同步您的蒐藏，隨時隨地收聽",
    backgroundColor: "#063540",
    imgPath: img3,
  },
];

export default function IntroGallery() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxStep = 2;

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "50vw", height: "100vh", flexGrow: 1 }}>
      <NavigateBeforeIcon
        onClick={handleBack}
        sx={{
          color: "white",
          position: "absolute",
          zIndex: 10,
          top: "50%",
        }}
      />
      <NavigateNextIcon
        onClick={handleNext}
        sx={{
          color: "white",
          position: "absolute",
          zIndex: 10,
          top: "50%",
          right: 0,
        }}
      />
      <Stepper activeStep={activeStep} />
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Stack
                height="100vh"
                alignItems="center"
                justifyContent="center"
                sx={{ background: step.backgroundColor }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
                <Stack alignItems="center" spacing={2}>
                  <Typography sx={{ color: "white" }} variant="h4">
                    {step.label}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{step.desc}</Typography>
                </Stack>
              </Stack>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

function Stepper({ activeStep }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        color: "black",
        position: "absolute",
        zIndex: 10,
        bottom: 70,
        left: "68%",
      }}
    >
      <div
        style={{
          height: "5px",
          width: "50px",
          background:
            activeStep === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
          border: "1px solid transparent",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          height: "5px",
          width: "50px",
          background:
            activeStep === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
          border: "1px solid transparent",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          height: "5px",
          width: "50px",
          background:
            activeStep === 2 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
          border: "1px solid transparent",
          borderRadius: "5px",
        }}
      />
    </Stack>
  );
}
