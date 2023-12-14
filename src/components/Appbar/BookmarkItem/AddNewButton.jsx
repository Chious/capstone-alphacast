import { ListItemButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddNewButton({ setEditBookmark, editBookmark }) {
  const handleCreate = () => {
    setEditBookmark({ ...editBookmark, edit: "create" });
  };

  return (
    <ListItemButton
      onClick={handleCreate}
      sx={{
        width: "200px",
        border: "1px solid #30A9DE",
        color: "#30A9DE",
        borderRadius: "10px",
        pr: 0,
        pl: 0,
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <AddIcon sx={{ color: "#30A9DE" }} />
        <p>新增分類</p>
      </Stack>
    </ListItemButton>
  );
}
