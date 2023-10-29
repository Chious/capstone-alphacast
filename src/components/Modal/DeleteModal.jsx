import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useApp } from "../../contexts/AppContext";

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

export default function DeleteModal() {
  const { editBookmark, setEditBookmark, bookmarkData, setBookmarkData } =
    useApp();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditBookmark({ ...editBookmark, edit: null, target: null });
  };

  const handleDelete = () => {
    const result = bookmarkData.filter(
      (bookmark) => bookmark.id !== editBookmark.target
    );
    setBookmarkData(result);
    setOpen(false);
    setEditBookmark({ ...editBookmark, edit: null, target: null });
  };

  const deleteTarget = editBookmark.target
    ? bookmarkData.find((bookmark) => bookmark.id === editBookmark.target)
    : { emoji: "", title: "" };

  React.useEffect(() => {
    const { target, edit } = editBookmark;

    if (target && edit == "delete") {
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
              刪除分類
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`您確定要刪除${deleteTarget.emoji} ${deleteTarget.title} 嗎？`}
          </Typography>
          <Box sx={ButtonGroupstyle}>
            <Stack direction="row" justifyContent="end">
              <Button sx={{ width: "200px" }} onClick={handleClose}>
                取消
              </Button>
              <Button sx={{ width: "200px" }} onClick={handleDelete}>
                確認刪除
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
