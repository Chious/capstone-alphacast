import { Card, Divider, IconButton, Stack } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useApp } from "../contexts/AppContext";
import ShowSeriesModal from "./Modal/ShowSeriesModal";
import { useState, useEffect } from "react";
import React from "react";

import { PostFavorite, RemoveFavorite } from "../api/acAPI";

export default function NowPlaying() {
  const { nowPlayInfo } = useApp();
  const { id, title, description } = nowPlayInfo;

  return (
    <Card className="podcast-now-playing" sx={{ p: 1, width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>正在播放</h1>
        <SaveIconButton id={id} />
      </Stack>

      <Divider />
      <Stack direction="column" alignItems="center" spacing={1}>
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            width: "100%",
            height: "50px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            width: "100%",
            height: "70px",
          }}
        >
          {description}
        </p>
        <PlayingModal id={id} />
      </Stack>
      <ShowSeriesModal />
    </Card>
  );
}

const SaveIconButton = ({ id }) => {
  const { savedFavorite, setSavedFavorite } = useApp();
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (savedFavorite.includes(id)) {
      setSave(true);
    }
  }, [id]);

  const handleSave = async () => {
    if (savedFavorite.includes(id)) {
      // if in savedFavorite, remove it
      console.log("remove id: ", id);
      const response = await RemoveFavorite(id);

      if (response === "success") {
        const newFavorite = savedFavorite.filter((item) => item !== id);
        setSavedFavorite(newFavorite);
        setSave(!save);
      }
    } else {
      // if not in savedFavorite, add it
      console.log("save id: ", id);
      const response = await PostFavorite(id);

      if (response === "success") {
        const newFavorite = [...savedFavorite, id];
        setSavedFavorite(newFavorite);
        setSave(!save);
      }
    }
  };

  if (save) {
    return (
      <IconButton
        onClick={async () => {
          handleSave();
        }}
      >
        <BookmarkIcon />
      </IconButton>
    );
  } else if (save === false) {
    return (
      <IconButton
        onClick={async () => {
          handleSave();
        }}
      >
        <BookmarkBorderIcon />
      </IconButton>
    );
  }
};

const PlayingModal = ({ id }) => {
  if (id !== null) {
    return (
      <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/episode/${id}?si=${id}`}
        width="90%"
        height="370"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  } else {
    return <></>;
  }
};
