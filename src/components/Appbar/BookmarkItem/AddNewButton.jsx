import { Button } from "@mui/material";
import { useApp } from "../../../contexts/AppContext";

export default function AddNewButton() {
  const { setEditBookmark, editBookdark } = useApp();
  const handleCreate = () => {
    setEditBookmark({ ...editBookdark, edit: "create" });
  };

  return <Button onClick={handleCreate}>新增分類</Button>;
}
