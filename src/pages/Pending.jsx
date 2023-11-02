import { Stack } from "@mui/material";
import logo from "../assets/logo.svg";
import Image from "mui-image";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function Pending() {
  const location = useLocation();
  const [spotifyParams, setSpotifyParams] = React.useState();
  const { setAccessToken, Auth } = useApp();

  React.useEffect(() => {
    const state = new URLSearchParams(location.search).get("state");

    if (location.pathname === "/pending" && state) {
      const code = new URLSearchParams(location.search).get("code");

      setAccessToken({ code });
      console.log(Auth);
    }
  }, [location]);

  return (
    <Stack
      sx={{
        color: "gray",
        background: "white",
        width: "100vw",
        height: "100vh",
      }}
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Image src={logo} width="30vw" height="5vh" fit="contain" />
      <h1>載入中 ...</h1>
      <LinearBuffer />
    </Stack>
  );
}

function LinearBuffer() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "50%" }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
