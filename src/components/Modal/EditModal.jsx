import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useApp } from "../../contexts/AppContext";
import EmojiMenu from "../Appbar/BookmarkItem/EmojiMenu";
import { AddCategory, GetCategory, putCategory } from "../../api/acAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  height: "75vh",
  bgcolor: "background.paper",
  border: "2px solid none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const ButtonGroupstyle = {
  backgroundColor: "white",
  boxShadow: 24,

  position: "absolute",
  bottom: 0,
  left: 0,

  width: "100%",
  p: 1,

  border: "1px solid none",
  borderRadius: "0px 0px 5px 5px",
};

export default function EditModal({ editBookmark, setEditBookmark }) {
  const { bookmark, setBookmark } = useApp();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditBookmark({ ...editBookmark, edit: null, target: null, name: null });
  };

  ///// Create New bookmark/////////

  const [listenInput, setListenInput] = React.useState({
    id: "default",
    title: "",
    emoji: "📚",
  });

  const handleInput = (event) =>
    setListenInput({ ...listenInput, title: event.target.value });
  const handleEmoji = (emoji) => {
    setListenInput({ ...listenInput, emoji: emoji });
  };

  const handleRevise = async () => {
    const { title, emoji } = listenInput;

    if (title !== "") {
      const name = `${emoji}${title}`;
      const response = await putCategory({
        categoriesId: editBookmark.target,
        name: name,
      });

      if (response === "success") {
        const updatedBookmark = await GetCategory();
        setBookmark(updatedBookmark);
        setOpen(false);
      }
    }
  };

  const handleAdd = async () => {
    console.log("handleAdd");
    const { title, emoji } = listenInput;

    if (title !== "") {
      const bookmark = `${emoji}${title}`;
      const response = await AddCategory({ bookmark });

      if (response === "success") {
        const updatedBookmark = await GetCategory();
        setBookmark(updatedBookmark);
        setOpen(false);
      }
    }
  };

  // Open Modal while edit
  React.useEffect(() => {
    const { target, edit } = editBookmark;

    if (target && edit === "edit") {
      handleOpen();

      const getEmojiName = (obj) => {
        // Match emoji at start
        const emojiRegex = /^([^\x00-\x7F]+)/;
        // Get emoji match
        const emojiMatch = obj.match(emojiRegex);
        // Get emoji
        const emoji = emojiMatch[1];

        // Get remaining string
        const name = obj.slice(emoji.length);

        return { emoji: emoji, title: name };
      };
      const targetNameAndEmoji = getEmojiName(editBookmark.name);

      setListenInput({
        id: editBookmark.target,
        title: targetNameAndEmoji.title,
        emoji: targetNameAndEmoji.emoji,
      });
    }

    if (edit === "create") {
      handleOpen();
    }
  }, [editBookmark.edit]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              編輯名稱
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Stack id="modal-modal-description" sx={{ mt: 2 }} direction="row">
            <EmojiMenu handleEmoji={handleEmoji} init={listenInput.emoji} />
            <input
              type="text"
              value={listenInput.title}
              placeholder="我的Podcast"
              onChange={handleInput}
              name="edit"
            />
          </Stack>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button sx={{ width: "200px" }} onClick={handleClose}>
                取消
              </Button>
              <Button
                sx={{ width: "200px" }}
                onClick={async () => {
                  if (editBookmark.edit === "edit") {
                    handleRevise();
                  } else if (editBookmark.edit === "create") {
                    handleAdd();
                  }
                }}
              >
                儲存
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
