import { getRefreshToken } from "./auth";
import axios from "axios";

const baseUri = import.meta.env.VITE_SPOTIFY_BASE_URL;

//1. Get Serval Episode

/*
curl --request GET \
  --url 'https://api.spotify.com/v1/search?q=%E7%99%BE%E9%9D%88%E6%9E%9C&type=episode&market=TW&limit=15' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/

export const searchEpisodes = async ({ input }) => {
  const url = baseUri + "v1/search";
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = {
    q: input,
    type: "episode",
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
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  if (response !== undefined) {
    return response.data.episodes.items;
  }
};

//2. Search Episode Detail
export const searchEpisodeDetail = async (ids) => {
  const url = `${baseUri}v1/episodes`;

  const idsString = ids.join(",");
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = { ids: idsString };

  const config = {
    headers: {
      Authorization: "Bearer " + spotifyToken,
    },
    params,
  };

  const response = axios
    .get(url, config)
    .then((data) => {
      const rawData = data.data.episodes;
      const episodeInfo = rawData.map((item) => {
        const { id, name, description, duration_ms, images, release_date } =
          item;
        const newObject = {
          id: id,
          title: name,
          description: description,
          videoLength: duration_ms,
          date: release_date,
          imgSrc: images[0]["url"],
        };

        return newObject;
      });

      return episodeInfo;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  return response;
};

//3. Search for Author name
export const GetAuthors = async (ids) => {
  /*const ids = ["1766nrskjXkwFHqG45trIP", "1MPUx6gvgr4WK4Ax7He24q"];*/
  const idsString = ids.join(",");

  const url = baseUri + "v1/episodes";
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = { ids: idsString };

  const config = {
    headers: {
      Authorization: "Bearer " + spotifyToken,
    },
    params,
  };

  const response = axios
    .get(url, config)
    .then((data) => {
      const rawData = data.data.episodes;
      const authorList = rawData.map((episodeObj) => {
        return episodeObj.show.name;
      });
      return authorList;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  return response;
};

// 4. Search Shows Info

export const searchShows = async ({ input }) => {
  const url = baseUri + "v1/search";
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = {
    q: input,
    type: "show",
    limit: 15,
  };

  const config = {
    headers: { Authorization: `Bearer ${spotifyToken}` },
    params,
  };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data.data.shows.items;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  if (response !== undefined) {
    return response;
  }
};

//5. Get Show's detail

export const searchShowDetail = async (ids) => {
  const url = `${baseUri}v1/shows`;

  const idsString = ids.join(",");
  const spotifyToken = localStorage.getItem("spotifyToken");
  const params = { ids: idsString };

  const config = {
    headers: {
      Authorization: "Bearer " + spotifyToken,
    },
    params,
  };

  const response = axios
    .get(url, config)
    .then((data) => {
      const rawData = data.data.shows;
      const showInfo = rawData.map((item) => {
        const { id, name, publisher, images } = item;
        const newObject = {
          id: id,
          author: name,
          publisher: publisher,
          imgSrc: images[0]["url"],
        };

        return newObject;
      });

      return showInfo;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  return response;
};

//6. Get Show's Episode

export const getShowEpisodes = async (id) => {
  const url = `${baseUri}v1/shows/${id}/episodes?limit=10`;

  const spotifyToken = localStorage.getItem("spotifyToken");

  const config = {
    headers: {
      Authorization: "Bearer " + spotifyToken,
    },
  };

  const response = axios
    .get(url, config)
    .then((data) => {
      const rawData = data.data.items;
      const filterData = rawData.map((item) => {
        const { id, name, description, images, release_date, duration_ms } =
          item;
        return {
          id: id,
          title: name,
          description: description,
          imgSrc: images[0]["url"],
          date: release_date,
          videoLength: duration_ms,
        };
      });

      return filterData;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  return response;
};

//6. Get User's Information

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

  const response = await axios
    .get(uri, config)
    .then((res) => {
      const { data } = res;
      const { display_name, images } = data;

      const newObj = { display_name: display_name, images: images[0]["url"] };
      localStorage.setItem("user", JSON.stringify(newObj));

      return newObj;
    })
    .catch(async (err) => {
      //If token is expired, refresh token
      if (err.error.status === 401) {
        await getRefreshToken();
        return GetUser();
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });
  return response;
};
