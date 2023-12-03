import { Stack } from "@mui/material";
import Image from "mui-image";
import folder from "../../assets/favorite-empty-folder.svg";
import { useState } from "react";
import NavigateShowsModal from "../Modal/NavigateShowsModal";

export default function NoEpisodeFound({ pageId }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack width="100%" alignItems="center" spacing={1}>
        <Image src={folder} duration={0} width="50px" height="50px" />
        <h1>您尚未收藏任何Podcast!</h1>
        <button onClick={handleOpen}>點擊新增</button>
      </Stack>

      <NavigateShowsModal open={open} setOpen={setOpen} pageId={pageId} />
    </>
  );
}
