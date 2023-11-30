import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

export default function EmojiMenu({ handleEmoji, init }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const openCss = open ? "visible" : "hidden";

  //Set up emoji icon

  const [inputStr, setInputStr] = useState(init);
  const onEmojiClick = (emoji) => {
    setInputStr(emoji.emoji);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="more" id="long-button" onClick={handleOpen}>
        <Typography>{inputStr}</Typography>
      </IconButton>
      <div
        className="picker-container"
        style={{
          width: "250px",
          maxWidth: "100%",
          position: "fixed",
          top: 250,
          left: 50,
          visibility: openCss,
          zIndex: 999,
        }}
      >
        <EmojiPicker
          pickerStyle={{ width: "100%" }}
          onEmojiClick={(emoji, event) => {
            onEmojiClick(emoji);
            handleEmoji?.(emoji);
          }}
        />
      </div>
    </>
  );
}
