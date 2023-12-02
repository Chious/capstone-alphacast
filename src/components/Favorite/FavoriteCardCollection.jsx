import { Card, Grid, IconButton, Stack } from "@mui/material";
import Image from "mui-image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useFavorite } from "../../contexts/FavoriteContext";
import { useApp } from "../../contexts/AppContext";

export const FavoriteCard = ({ data }) => {
  const { id, title, description, imgSrc, date, videoLength } = data;

  const formattedTime = (milliseconds) => {
    var remainDuration = Number(milliseconds);

    //Get hours
    const hours = Math.floor(remainDuration / (1000 * 60 * 60));
    remainDuration = remainDuration - hours * (1000 * 60 * 60);

    //Get remain minutes
    const minutes = Math.floor(remainDuration / (1000 * 60));

    const formatted =
      hours !== 0 ? `${hours} 小時 ${minutes} 分鐘` : `${minutes} 分鐘`;

    return formatted;
  };

  const { pickedCard, setPickedCard } = useFavorite();
  const { setNowPlayInfo } = useApp();
  //If button clicked, select the card
  const handlePlayClick = () => {
    setPickedCard(id);
    setNowPlayInfo({ id: id, title: title, description: description });
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
                  {date}・{formattedTime(videoLength)}
                </p>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export const FavoriteCardCollection = ({ data }) => {
  const FavoriteCards = data.map((item, index) => {
    return <FavoriteCard data={item} key={index} />;
  });

  return (
    <Grid container className="song-collection-container" spacing={2}>
      {FavoriteCards}
    </Grid>
  );
};
