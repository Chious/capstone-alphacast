import { Box, Card, Grid } from "@mui/material";
import Image from "mui-image";

export const PodcastCard = ({ data, card, setCard, author }) => {
  const { title, id, imgSrc } = data;
  const choosenCard = card.id;
  const chooseCardStyle =
    choosenCard === id
      ? {
          border: "1px solid orange",
        }
      : {
          border: "1px solid transparent",
        };

  const handleClick = () => {
    if (choosenCard === id) {
      setCard({ id: null, title: null, author: null, imgSrc: null });
    } else {
      setCard({ id: id, title: title, author: null, imgSrc: imgSrc });
    }
  };

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
        style={chooseCardStyle}
        onClick={handleClick}
      >
        <Image className="podcast-card-img" src={imgSrc} duration={0} />
        <p
          className="pocast-card-title"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
            height: "24px",
            fontWeight: "500",
          }}
        >
          {title}
        </p>
        <p className="pocast-card-author" style={{ color: "#93989A" }}>
          {author}
        </p>
      </Card>
    </Grid>
  );
};

export const PodcastCardCollection = ({ data, authorList, card, setCard }) => {
  const podcastcards = data.map((item, index) => {
    const { id, name, images } = item;
    const imgSrc = images[0].url;

    const data = { id: id, title: name, imgSrc: imgSrc };

    return (
      <PodcastCard
        data={data}
        key={id}
        card={card}
        setCard={setCard}
        author={authorList[index]}
      />
    );
  });

  return (
    <Grid container className="podcast-collection-container" spacing={2}>
      {podcastcards}
    </Grid>
  );
};
