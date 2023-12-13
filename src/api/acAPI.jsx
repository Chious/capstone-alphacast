import axios from "axios";

const baseUri = import.meta.env.VITE_AC_API_BASE_URL;

export const GetFavoriteIds = async () => {
  const url = `${baseUri}api/me`;
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: `Bearer ${acToken}`,
    },
  };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data.data.favoriteEpisodeIds;
    })
    .catch((err) => console.log(err));

  return response;
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
      const token = data.data.token;
      localStorage.setItem("acToken", token);
    })
    .catch((err) => console.log(err));
};

export const RemoveFavorite = async (episode) => {
  const uri = baseUri + "api/episodes/" + episode;
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  const response = axios
    .delete(uri, config)
    .then(() => {
      return "success";
    })
    .catch((err) => console.log(err));
  return response;
};

export const PostFavorite = async (episode) => {
  const uri = baseUri + "api/episodes";
  const acToken = localStorage.getItem("acToken");

  const bodyParam = { episodeId: episode };
  const config = {
    headers: {
      Authorization: `Bearer ${acToken}`,
    },
  };

  const response = await axios
    .post(uri, bodyParam, config)
    .then((data) => {
      return "success";
    })
    .catch((err) => {
      console.log("err: ", err);
      if (err.error.status === 403) {
        console.log("Invalid token!");
      }

      if (err.error.status === 409) {
        console.log("User has already favorited this episode");
      }
    });

  return response;
};

export const GetCategory = async () => {
  const uri = baseUri + "api/categories";
  const acToken = localStorage.getItem("acToken");

  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  const response = await axios
    .get(uri, config)
    .then((data) => {
      return data.data.categories;
    })
    .catch((err) => console.log(err));

  return response;
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

  const response = await axios
    .post(uri, bodyParameters, config)
    .then((res) => {
      return "success";
    })
    .catch((err) => console.log(err));

  return response;
};

export const deleteCategory = async (categoriesId) => {
  const uri = `${baseUri}api/categories/${categoriesId}`;
  const acToken = localStorage.getItem("acToken");
  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  const response = await axios
    .delete(uri, config)
    .then(() => {
      return "success";
    })
    .catch((err) => console.log(err));

  return response;
};

export const putCategory = async ({ categoriesId, name }) => {
  const uri = `${baseUri}api/categories/${categoriesId}`;
  const acToken = localStorage.getItem("acToken");
  const config = {
    headers: {
      Authorization: "Bearer " + acToken,
    },
  };

  const bodyParameters = {
    name: name,
  };

  const response = await axios
    .put(uri, bodyParameters, config)
    .then(() => {
      return "success";
    })
    .catch((err) => console.log(err));

  return response;
};

export const addShowToCategory = async ({ categoryId, showId }) => {
  const uri = baseUri + `api/categories/${categoryId}/shows`;
  const acToken = localStorage.getItem("acToken");
  const bodyParam = { showId: showId };
  const config = {
    headers: {
      Authorization: `Bearer ${acToken}`,
    },
  };

  const response = await axios
    .post(uri, bodyParam, config)
    .then((res) => {
      return "success";
    })
    .catch((err) => console.log(err));

  return response;
};
