import axios from "axios";

const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const SpotifyLogin = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID; // Spotify Client id

  const redirectUri = import.meta.env.VITE_SPOTIFY_API_REDIRECT_URL; // Adjust the redirect URI

  const scope = "user-read-private user-read-email"; // Adjust scope based on your needs
  const state = generateRandomString(10); // Generate a random state for security

  const handleLoginClick = () => {
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
    window.location = spotifyLoginUrl;
  };

  return (
    <>
      <button onClick={handleLoginClick}>使用SPOTIFY帳號登入</button>
    </>
  );
};

export const GetAccessToken = async ({ code }) => {
  const client_id = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_SPOTIFY_API_REDIRECT_URL;

  const url = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  };

  try {
    const { data } = await axios.post(url, params, { headers });
    return data;
  } catch (error) {
    return error;
  }
};

export const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.accessToken);
  localStorage.setItem("refresh_token", response.refreshToken);
};
