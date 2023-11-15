import { Box, Card, Grid } from "@mui/material";
import data from "../data/podcast.json";
import Image from "mui-image";
import { useState } from "react";

export const PodcastCard = ({ data, index, card, setCard }) => {
  const { title, author, imgSrc } = data;
  const choosenCard = card.index;
  const chooseCardStyle =
    choosenCard === index
      ? {
          border: "1px solid orange",
        }
      : {
          border: "1px solid transparent",
        };

  const handleClick = () => {
    if (choosenCard === index) {
      setCard({ index: null, title: null, author: null, imgSrc: null });
      console.log("clear!");
    } else {
      setCard({ index: index, title: title, author: author, imgSrc: imgSrc });
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
          }}
        >
          {title}
        </p>
        <p className="pocast-card-author">{author}</p>
      </Card>
    </Grid>
  );
};

export const PodcastCardCollection = () => {
  const [card, setCard] = useState({
    index: null,
    title: null,
    author: null,
    imgSrc: null,
  });

  const podcastcards = data.map((item, index) => {
    return (
      <PodcastCard
        data={item}
        key={index}
        card={card}
        setCard={setCard}
        index={index}
      />
    );
  });

  return (
    <Grid container className="podcast-collection-container" spacing={2}>
      {podcastcards}
    </Grid>
  );
};
