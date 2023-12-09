import { Button, Card, Grid, IconButton, Stack } from "@mui/material";
import Image from "mui-image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../../contexts/BookmarkContext";

export const BookmarkCard = ({ data, setOpen, setShowId }) => {
  const { id, author, publisher, imgSrc } = data;

  const { pickedCard, setPickedCard } = useBookmark();
  //If button clicked, select the card
  const handlePlayClick = () => {
    setPickedCard(id);
  };

  const handleOpen = () => {
    setShowId(id);
    setOpen(true);
  };

  //If selected, change borderColor
  const selectStyle =
    id === pickedCard
      ? { border: "1px solid #FF7F50" }
      : { border: "1px solid transparent" };

  return (
    <Grid item xs={3}>
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
        <Image
          className="song-card-img"
          src={imgSrc}
          duration={0}
          fit="cover"
        />

        <Stack spacing={1}>
          <p
            className="song-card-title"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {author}
          </p>

          <p
            className="song-card-author"
            style={{
              height: "24px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {publisher}
          </p>
          <Button onClick={handleOpen}>更多</Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export const BookmarkCardCollection = ({ data, setOpen, setShowId }) => {
  const BookmarkCards = data.map((item, index) => {
    return (
      <BookmarkCard
        data={item}
        key={index}
        setOpen={setOpen}
        setShowId={setShowId}
      />
    );
  });

  return (
    <Grid container className="song-collection-container" spacing={2}>
      {BookmarkCards}
    </Grid>
  );
};
