import { Card, Grid, IconButton, Stack } from "@mui/material";
import data from "../data/songs.json";
import Image from "mui-image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../contexts/BookmarkContext";

export const BookmarkCard = ({ data }) => {
  const { id, title, description, imgSrc, date, videoLength } = data;

  const { pickedCard, setPickedCard } = useBookmark();
  //If button clicked, select the card
  const handlePlayClick = () => {
    setPickedCard(id);
  };

  //If selected, change borderColor
  const selectStyle =
    id === pickedCard
      ? { border: "1px solid #FF7F50" }
      : { border: "1px solid transparent" };

  return (
    <Grid item xs={12}>
      <Card
        className="podcast-card"
        sx={{
          shadows: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: "100%",
        }}
        style={selectStyle}
      >
        <Grid container direction="row" spacing={1}>
          <Grid item lg={2}>
            <Image
              className="song-card-img"
              src={imgSrc}
              duration={0}
              fit="cover"
            />
          </Grid>
          <Grid item lg={10}>
            <Stack spacing={1}>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
              >
                <p
                  className="song-card-title"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </p>
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
              </Stack>
              <p
                className="song-card-author"
                style={{
                  height: "50px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {description}
              </p>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={handlePlayClick}>
                  <PlayCircleIcon className="song-card-play-btn" />
                </IconButton>

                <p>
                  {date}・{videoLength}
                </p>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export const BookmarkCardCollection = () => {
  const BookmarkCards = data.map((item, index) => {
    return <BookmarkCard data={item} key={index} />;
  });

  return (
    <Grid container className="song-collection-container" spacing={2}>
      {BookmarkCards}
    </Grid>
  );
};
