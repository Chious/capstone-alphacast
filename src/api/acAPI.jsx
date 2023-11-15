import axios from "axios";

const baseUri = import.meta.env.VITE_AC_API_BASE_URL;

export const GetUserInfo = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  axios
    .get(baseUri, config)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const CreateAccount = async () => {
  const uri = baseUri + "api/users";
  const spotifyToken = localStorage.getItem("spotifyToken");

  const bodyParameters = {
    spotifyToken: spotifyToken,
  };

  axios
    .post(uri, bodyParameters)
    .then((data) => {
      const { token } = data;
      localStorage.setItem("acToken", token);
    })
    .catch((err) => console.log(err));
};

export const RemoveFavorite = async ({ episode }) => {
  const uri = baseUri + "apisodes/" + episode;
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  axios.delete(uri, config);
};

export const GetCategory = async () => {
  const uri = baseUri + "api/categories";
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  axios.get(uri, config);
};

export const AddCategory = async ({ bookmark }) => {
  const uri = baseUri + "api/categories";
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  const bodyParameters = {
    name: bookmark,
  };

  axios.post(uri, config, bodyParameters);
};
