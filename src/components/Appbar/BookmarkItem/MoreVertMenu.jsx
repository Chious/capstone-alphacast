import { MenuItem, MenuList, Paper } from "@mui/material";

export default function MoreVertMenu({
  moreVertPosition,
  setMoreVertPosition,
  editBookmark,
  setEditBookmark,
}) {
  const { open, xPosition, yPosition } = moreVertPosition;
  const openCss = open ? "visible" : "hidden";

  const handleEdit = () => {
    setEditBookmark({ ...editBookmark, edit: "edit" });
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  const handleDelete = () => {
    setEditBookmark({ ...editBookmark, edit: "delete" });
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  const handleAdd = () => {
    setEditBookmark({ ...editBookmark, edit: "add" });
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  return (
    <Paper
      sx={{
        width: 150,
        maxWidth: "100%",
        position: "fixed",
        top: `${yPosition - 30}px`,
        left: `${xPosition + 40}px`,
        visibility: openCss,
      }}
    >
      <MenuList>
        <MenuItem onClick={handleEdit}>編輯名稱</MenuItem>
        <MenuItem onClick={handleDelete}>刪除分類</MenuItem>
        <MenuItem onClick={handleAdd}>新增Podcast</MenuItem>
      </MenuList>
    </Paper>
  );
}
