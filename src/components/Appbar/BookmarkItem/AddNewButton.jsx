import { Button } from "@mui/material";

export default function AddNewButton({ setEditBookmark, editBookmark }) {
  const handleCreate = () => {
    setEditBookmark({ ...editBookmark, edit: "create" });
  };

  return (
    <Button onClick={handleCreate} sx={{ width: "150px" }}>
      新增分類
    </Button>
  );
}
