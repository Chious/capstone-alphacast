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
        <h2 style={{ color: "#718096" }}>
          您尚未加入任何 Podcast，可以點擊按鈕新增！
        </h2>
        <button
          onClick={handleOpen}
          style={{
            width: "150px",
            height: "40px",
            background: "#FF7F50",
            border: "1px solid transparent",
            borderRadius: "5px",
          }}
        >
          新增 Podcast
        </button>
      </Stack>

      <NavigateModal open={open} setOpen={setOpen} />
    </>
  );
}
