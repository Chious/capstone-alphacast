import { Grid, Typography, ListItemButton, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiMenu from "./EmojiMenu";
import { useNavigate } from "react-router-dom";

export const BookmarkItem = ({
  name,
  id,
  moreVertPosition,
  setMoreVertPosition,
  editBookmark,
  setEditBookmark,
}) => {
  const emojiRegex = /^([^\x00-\x7F]+)/;
  const emoji = name.match(emojiRegex)[1];
  const title = name.slice(2);

  const navigate = useNavigate();
  var formatted;
  if (id !== "/favorite" && id !== "/podcast") {
    formatted = `/bookmark/${id}?id=${id}`;
  } else {
    formatted = id;
  }

  // Control Movert Menu
  const { xPosition, yPosition } = moreVertPosition;
  const handleOpen = (event) => {
    const iconButtonPosition = event.target.getBoundingClientRect();
    const { left, bottom } = iconButtonPosition;

    if (xPosition === left && yPosition === bottom) {
      setEditBookmark({ ...editBookmark, target: null });
      setMoreVertPosition({ ...moreVertPosition, open: false });
    } else {
      setEditBookmark({ ...editBookmark, target: id, name: name });
      setMoreVertPosition({ xPosition: left, yPosition: bottom, open: true });
    }
  };

  return (
    <ListItemButton
      onClick={() => {
        navigate(formatted);
      }}
    >
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
          <IconButton
            aria-label="more"
            id="long-button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(e);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
