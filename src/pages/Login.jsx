import { Card, Grid, Stack } from "@mui/material";
import IntroGallery from "../components/Login/IntroGallery";
import LoginButtonGroup from "../components/Login/LoginButtonGroup";
import { useEffect } from "react";

export default function Login() {
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    if (token !== undefined) {
      localStorage.clear();
    }
  }, []);

  return (
    <Card sx={{ width: "100vw", height: "100vh" }}>
      <Stack direction="row">
        <LoginButtonGroup />
        <IntroGallery />
      </Stack>
    </Card>
  );
}
