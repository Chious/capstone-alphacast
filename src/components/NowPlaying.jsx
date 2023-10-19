import { Card, Divider, Stack } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NavigateModal from "./NavigateModal";

export default function NowPlaying() {
  return (
    <Card className="podcast-now-playing" sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>正在播放</h1>
        <BookmarkBorderIcon />
      </Stack>

      <Divider />
      <p>EP9慢跑練身，卜卦練心</p>
      <p>本週的快樂Tips一定要去用用看！好玩</p>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/show/1D41msc4U5N1NIxCYlZw24?utm_source=generator"
        width="100%"
        height="130"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <NavigateModal />
    </Card>
  );
}