import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { useApp } from "../../../contexts/AppContext";

export default function MoreVertMenu({ name, id }) {
  const { editBookmark, setEditBookmark } = useApp();
  const [open, setOpen] = React.useState(false);
  const [xPosition, setXPosition] = React.useState(0);
  const [yPosition, setYPosition] = React.useState(0);

  const handleOpen = (event) => {
    const iconButtonPosition = event.target.getBoundingClientRect();
    setXPosition(iconButtonPosition.left);
    setYPosition(iconButtonPosition.bottom);
    setOpen(!open);

    const handleEditTarget = () => {
      if (editBookmark.target !== id) {
        setEditBookmark({ ...editBookmark, target: id });
      } else {
        setEditBookmark({ ...editBookmark, target: null });
      }
    };
    handleEditTarget();
  };

  const handleMenuEdit = (edit) => {
    if (editBookmark.target) {
      setEditBookmark({ ...editBookmark, edit: edit });
      setOpen(false);
    }
  };

  const openCss = open ? "visible" : "hidden";

  return (
    <>
      <IconButton aria-label="more" id="long-button" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Paper
        sx={{
          width: 150,
          maxWidth: "100%",
          position: "fixed",
          top: `${yPosition - 30}px`,
          left: `${xPosition + 35}px`,
          visibility: openCss,
        }}
      >
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleMenuEdit("edit");
            }}
          >
            編輯名稱
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleMenuEdit("delete");
            }}
          >
            刪除分類
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleMenuEdit("navigate");
            }}
          >
            新增Podcast
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
}
