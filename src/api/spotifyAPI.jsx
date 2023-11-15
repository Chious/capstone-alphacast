import { getRefreshToken } from "./auth";
import axios from "axios";

const baseUri = import.meta.env.VITE_SPOTIFY_BASE_URL;

//1. Get Serval Episode

/*
curl --request GET \
  --url 'https://api.spotify.com/v1/search?q=%E7%99%BE%E9%9D%88%E6%9E%9C&type=episode&market=TW&limit=15' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/

export const searchEpisodes = async () => {
  const url = import.meta.env.VITE_SPOTIFY_BASE_URL + "v1/search";
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = {
    q: "百靈果",
    type: "episode",
    market: "TW",
    limit: 15,
  };

  const config = {
    headers: { Authorization: `Bearer ${spotifyToken}` },
    params,
  };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  if (response !== undefined) {
    return response;
  }
};

//2. Search for episode
/*

curl --request GET \
  --url 'https://api.spotify.com/v1/search?q=SEARCH_NAME&type=episode' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

*/

//3. Get User's Information

/*
curl --request GET \
  --url https://api.spotify.com/v1/me \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/

export const GetUser = async () => {
  const uri = baseUri + "v1/me";
  const spotifyToken = localStorage.getItem("spotifyToken");

  const config = {
    headers: {
      Authorization: "Bearer " + spotifyToken,
    },
  };

  axios
    .get(uri, config)
    .then((res) => {
      const { data } = res;
      const { display_name, images } = data;
      let avator = "";

      if (images.length !== 0) {
        avator = images[0].url;
      }

      return res;
    })
    .catch(async (err) => {
      console.log(err);
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
        return GetUser();
      } else {
        console.log("request failed!!!");
      }
    });
};
