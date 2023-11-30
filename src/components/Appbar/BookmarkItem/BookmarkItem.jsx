import { Grid, Typography, ListItemButton } from "@mui/material";
import EmojiMenu from "./EmojiMenu";
import MoreVertMenu from "./MoreVertMenu";

export const BookmarkItem = ({ name, id }) => {
  const emojiRegex = /^([^\x00-\x7F]+)/;
  const emoji = name.match(emojiRegex)[1];
  const title = name.slice(2);

  return (
    <ListItemButton>
      <Grid container direction="row" height="45px" alignItems="center">
        <Grid item lg={2.5}>
          <EmojiMenu init={emoji} />
        </Grid>
        <Grid item lg={7}>
          <Typography
            sx={{
              height: "24px",
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item lg={2.5}>
          <MoreVertMenu name={name} id={id} />
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
