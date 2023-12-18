import { Stack } from "@mui/material";
import logo from "../assets/logo.svg";
import Image from "mui-image";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useEffect, useState, useRef } from "react";
import { GetUser } from "../api/spotifyAPI";

export default function Pending() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken, CreateAccount, isValid, setIsValid } = useApp();

  //1. Get Access token from Spotify and backend
  useEffect(() => {
    const state = new URLSearchParams(location.search).get("state");

    if (location.pathname === "/pending" && state) {
      const code = new URLSearchParams(location.search).get("code");

      setAccessToken({ code })
        .then(() => new Promise((reslove) => setTimeout(reslove, 2000))) //wait for second, after Spotify create token.
        .then(async () => {
          await GetUser();
        })
        .then(() => {
          CreateAccount();
        })
        .then(() => new Promise((reslove) => setTimeout(reslove, 2000)))
        .then(() => {
          setIsValid(true);
        })
        .catch((err) => {
          console.log("err", err);
          if (localStorage.getItem("acToken")) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        });
    }
  }, []);

  //2. If get token from backend, navigate to "/favorite"
  useEffect(() => {
    if (isValid === true) {
      navigate("/favorite");
    }
  }, [isValid]);

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
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
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

  useEffect(() => {
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
