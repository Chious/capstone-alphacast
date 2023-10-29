import { Stack, Typography } from "@mui/material";
import EmojiMenu from "./EmojiMenu";
import MoreVertMenu from "./MoreVertMenu";

export const BookmarkItem = ({ name, id }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      height="30px"
    >
      <EmojiMenu />
      <Typography>{name}</Typography>
      <MoreVertMenu name={name} id={id} />
    </Stack>
  );
};
