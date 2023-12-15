import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useApp } from "../../contexts/AppContext";
import { deleteCategory } from "../../api/acAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "50vh",
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

export default function DeleteModal({ editBookmark, setEditBookmark }) {
  const { bookmark, setBookmark } = useApp();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setEditBookmark({ ...editBookmark, edit: null, target: null, name: null });
  };

  const handleDelete = async () => {
    const result = bookmark.filter(
      (bookmark) => bookmark.id !== editBookmark.target
    );

    //Reset Bookmark
    setBookmark(result);
    const response = await deleteCategory(editBookmark.target);
    if (response === "success") {
      setOpen(false);
      setEditBookmark({
        ...editBookmark,
        edit: null,
        target: null,
        name: null,
      });
    }
  };

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

  const target = editBookmark.name
    ? getEmojiName(editBookmark.name)
    : { emoji: "", title: "" };

  React.useEffect(() => {
    if (editBookmark.edit === "delete") {
      console.log("target: ", editBookmark);
      setOpen(true);
    }
  }, [editBookmark]);

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
              刪除分類
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`您確定要刪除 ${target.emoji} ${target.title} 嗎？`}
          </Typography>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button
                sx={{ width: "200px", color: "#111111" }}
                onClick={handleClose}
              >
                取消
              </Button>
              <Button
                sx={{
                  width: "200px",
                  background: "#FF7F50",
                  color: "white",
                  "&:hover": { background: "white", color: "#FF7F50" },
                }}
                onClick={async () => {
                  handleDelete();
                }}
              >
                確認刪除
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
