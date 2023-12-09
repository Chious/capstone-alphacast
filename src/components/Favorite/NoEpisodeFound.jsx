import { Stack } from "@mui/material";
import Image from "mui-image";
import folder from "../../assets/favorite-empty-folder.svg";
import NavigateModal from "../Modal/NavigateFavoriteModal";
import { useState } from "react";

export default function NoEpisodeFound() {
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

      <NavigateModal open={open} setOpen={setOpen} />
    </>
  );
}
