import { Box, Card, Grid } from "@mui/material";
import Image from "mui-image";

export const ShowCard = ({ data, card, setCard }) => {
  const { id, author, publisher, imgSrc } = data;
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
      setCard({ id: id, title: null, author: author, imgSrc: imgSrc });
    }
  };

  return (
    <Grid item xs={3}>
      <Card
        className="show-card"
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
        <Image className="show-card-img" src={imgSrc} duration={0} />
        <p
          className="pocast-card-author"
          style={{
            overflow: "hidden",
            height: "20px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {author}
        </p>
        <p
          className="pocast-card-publisher"
          style={{
            overflow: "hidden",
            height: "20px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {publisher}
        </p>
      </Card>
    </Grid>
  );
};

export const ShowCardCollection = ({ data, card, setCard }) => {
  const showcards = data.map((item) => {
    const { id, name, publisher, images } = item;
    const imgSrc = images[0].url;

    const data = { id: id, author: name, publisher: publisher, imgSrc: imgSrc };

    return <ShowCard data={data} key={id} card={card} setCard={setCard} />;
  });

  return (
    <Grid container className="show-collection-container" spacing={2}>
      {showcards}
    </Grid>
  );
};
