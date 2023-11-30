import { Button } from "@mui/material";
import { useApp } from "../../../contexts/AppContext";

export default function AddNewButton() {
  const { setEditBookmark, editBookmark } = useApp();
  const handleCreate = () => {
    setEditBookmark({ ...editBookmark, edit: "create" });
  };

  return (
    <Button onClick={handleCreate} sx={{ width: "150px" }}>
      新增分類
    </Button>
  );
}
