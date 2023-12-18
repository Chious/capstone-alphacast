import { MenuItem, MenuList, Paper } from "@mui/material";
import NavigateShowsModal from "../../Modal/NavigateShowsModal";
import NavigateModal from "../../Modal/NavigateFavoriteModal";
import { useLocation } from "react-router-dom";

export default function MoreVertMenu({
  moreVertPosition,
  setMoreVertPosition,
  editBookmark,
  setEditBookmark,
  openNavigateModal,
  setOpenNavigateModal,
}) {
  const { open, xPosition, yPosition } = moreVertPosition;
  const openCss = open ? "visible" : "hidden";
  // get PageId
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageId = searchParams.get("id");

  const searchModal =
    pageId !== null ? (
      <NavigateShowsModal
        open={openNavigateModal}
        setOpen={setOpenNavigateModal}
        pageId={pageId}
      />
    ) : (
      <NavigateModal open={openNavigateModal} setOpen={setOpenNavigateModal} />
    );

  const handleEdit = () => {
    setEditBookmark({ ...editBookmark, edit: "edit" });
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  const handleDelete = () => {
    setEditBookmark({ ...editBookmark, edit: "delete" });
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  const handleAdd = () => {
    setOpenNavigateModal(true);
    setMoreVertPosition({ xPosition: 0, yPosition: 0, open: false });
  };

  return (
    <>
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
          <MenuItem
            onClick={handleEdit}
            sx={{ "&:hover": { color: "#FF7F50" } }}
          >
            編輯名稱
          </MenuItem>
          {editBookmark.target !== "/favorite" && (
            <MenuItem
              onClick={handleDelete}
              sx={{ "&:hover": { color: "#FF7F50" } }}
            >
              刪除分類
            </MenuItem>
          )}
          <MenuItem
            onClick={handleAdd}
            sx={{ "&:hover": { color: "#FF7F50" } }}
          >
            新增Podcast
          </MenuItem>
        </MenuList>
      </Paper>
      {searchModal}
    </>
  );
}
