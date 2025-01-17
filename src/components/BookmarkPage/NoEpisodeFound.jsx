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
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Image src={folder} duration={0} width="50px" height="50px" />
        <h1>您尚未加入任何節目，可以點擊下方按鈕新增！</h1>
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
          新增節目
        </button>
      </Stack>
      <NavigateShowsModal open={open} setOpen={setOpen} pageId={pageId} />
    </>
  );
}
