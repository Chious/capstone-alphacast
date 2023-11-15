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
    localStorage.setItem("spotifyToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    return data;
  } catch (error) {
    return error;
  }
};

export const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refreshToken");
  const url = "https://accounts.spotify.com/api/token";

  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const bodyParameters = { code: refreshToken };

  axios
    .post(url, config, bodyParameters)
    .then((data) => {
      const { access_token, refresh_token } = data;

      localStorage.setItem("spotifyToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    })
    .catch((error) => console.log(error));
};
