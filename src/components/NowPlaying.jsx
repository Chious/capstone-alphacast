import { Button, Card, Divider, IconButton, Stack } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useApp } from "../contexts/AppContext";

export default function NowPlaying() {
  const { nowPlayInfo } = useApp();
  const { id, title, description } = nowPlayInfo;

  const PlayingModal = ({ id }) => {
    return (
      <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/episode/${id}?si=${id}`}
        width="90%"
        height="370"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  };

  const isShowIframe = id !== null && <PlayingModal id={id} />;

  const episodeID = "27AcQgmQndtB4fRreclCII";

  return (
    <Card className="podcast-now-playing" sx={{ p: 1, width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>正在播放</h1>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
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
        {isShowIframe}
      </Stack>
    </Card>
  );
}
