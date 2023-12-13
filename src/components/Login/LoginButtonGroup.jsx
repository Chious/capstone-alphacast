import { Stack } from "@mui/material";
import logo from "../../assets/logo.svg";
import Image from "mui-image";
import { SpotifyLogin } from "../../api/auth";

export default function LoginButtonGroup() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: "50vw", height: "100vh" }}
      spacing={2}
    >
      <Image src={logo} height="7%" width="30%" fit="contain" />
      <h1 style={{ fontSize: "15px" }}>Connecting Stories That Matter</h1>
      <SpotifyLogin />
      <h2>沒有帳號嗎？註冊帳號</h2>
    </Stack>
  );
}
